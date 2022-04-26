import { pipe } from "fp-ts/lib/function";
import { filter, toArray } from "fp-ts/lib/ReadonlyArray";
import { replace, split } from "fp-ts/lib/string";

export function tokenize(word: string): string[] {
  return pipe(
    word,
    replace(/\r?\n|\r/g, " "),
    replace(/\W/g, " $& "),
    split(" "),
    filter(Boolean),
    toArray
  );
}
