import { readFile } from "fs/promises";
import is from "@sindresorhus/is";
import fetch from "node-fetch";

export const read_text_from = (path: string): Promise<string> =>
  is.urlString(path)
    ? fetch(path).then((res) => res.text())
    : readFile(path, "utf8");
