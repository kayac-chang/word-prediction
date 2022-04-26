import { to_n_grams } from "../to_n_grams";
import fc from "fast-check";

describe("fn to_n_grams: generate n-grams mapping", () => {
  describe("is a higher order function", () => {
    test("passing n, should return a function", () =>
      fc.assert(
        fc.property(fc.nat(), (n) =>
          expect(to_n_grams(n)).toBeInstanceOf(Function)
        )
      ));
  });

  describe("3-grams mapping", () => {
    let generate: ReturnType<typeof to_n_grams>;

    beforeEach(() => {
      generate = to_n_grams(3);
    });

    test("passing empty tokens, should return empty map", () => {
      expect(generate([])).toStrictEqual({});
    });

    test("passing tokens, should return map", () => {
      const testcase = ["'", "Good", "evening", ","];

      expect(generate(testcase)).toStrictEqual({
        "' Good evening": { ",": 1 },
      });
    });
  });
});
