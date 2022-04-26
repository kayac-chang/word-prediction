import { lookup } from "../lookup";

describe("fn lookup: lookup probabilities of the last word in the lexicon", () => {
  describe("lookup is higher order function", () => {
    test("passing any lexicon, should return lookup_with function", () => {
      expect(lookup({})).toBeInstanceOf(Function);
    });

    describe("single lexicon", () => {
      let lookup_with: ReturnType<typeof lookup>;

      beforeEach(() => {
        lookup_with = lookup({
          "some thing match": {
            word: 1,
          },
        });
      });

      test("passing some word match, should return suggested list", () => {
        expect(lookup_with("some thing match"))
          //
          .toStrictEqual([{ word: "word", weight: 1 }]);
      });
    });
  });
});
