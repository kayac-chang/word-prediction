import { Lexicon } from "types";

export const to_n_grams =
  (n: number) =>
  (tokens: string[]): Lexicon => {
    const map: Lexicon = {};

    // for each entry in the tokens
    for (let index = 0; index < tokens.length - n; index += 1) {
      // create a phrase from the current token and the next depth-1 number of tokens
      const phrase = tokens.slice(index, n).join(" ");

      // if the phrase doesn't already exist in the map
      if (!(phrase in map)) {
        // add the phrase to the map
        map[phrase] = {};
      }

      // get the next token after the phrase (current token + depth index) as likely word
      const next_token = tokens[index + n];
      // if the word does not exist in the phrase word list
      if (!(next_token in map[phrase])) {
        // add word
        map[phrase][next_token] = 0;
      }
      // increment word weight
      map[phrase][next_token] += 1;
    }

    return map;
  };
