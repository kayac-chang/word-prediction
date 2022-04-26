import { Lexicon, Suggest } from "types";

export const lookup =
  (lexicon: Lexicon) =>
  (current_sentence: string): Suggest[] =>
    Object.entries(lexicon[current_sentence] ?? {})
      //
      .map(([word, weight]) => ({ word, weight }));
