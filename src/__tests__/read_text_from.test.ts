import { read_text_from } from "../read_text_from";
import fs from "fs/promises";
import { setTimeout } from "timers/promises";
import { getSystemErrorMap } from "util";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { FetchError } from "node-fetch";

const server = setupServer(
  rest.get("https://remote-path", async (_req, res, ctx) => {
    await setTimeout(100);
    return res(ctx.text("text content"));
  })
);

describe("fn read_text_from: load text file from disk or network", () => {
  beforeEach(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() =>
    jest.spyOn(fs, "readFile").mockImplementation(async (path) => {
      await setTimeout(100);

      if (path !== "exist_local_path") {
        const [errno, message] = getSystemErrorMap().get(-2)!;

        throw new Error(`${errno}: ${message}, open '${path}'`);
      }

      return "text content";
    })
  );

  describe("read from disk", () => {
    test("passing exist_local_path, should return text content", () =>
      expect(read_text_from("exist_local_path"))
        //
        .resolves.toBe("text content"));

    test("passing not_exist_local_path, should throw ENOENT", () =>
      expect(read_text_from("not_exist_local_path"))
        //
        .rejects.toStrictEqual(
          new Error(
            `ENOENT: no such file or directory, open 'not_exist_local_path'`
          )
        ));
  });

  describe("read from remote", () => {
    test("padding https://remote-path, should return text content", () =>
      expect(read_text_from("https://remote-path"))
        //
        .resolves.toBe("text content"));

    test("padding https://not-exist-remote-path, should throw ENOTFOUND", () =>
      expect(read_text_from("https://not-exist-remote-path"))
        //
        .rejects.toStrictEqual(
          new FetchError(
            `request to https://not-exist-remote-path/ failed, reason: getaddrinfo ENOTFOUND not-exist-remote-path`,
            ""
          )
        ));
  });
});
