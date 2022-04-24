import { read_text_from, tokenize, to_n_grams, lookup } from ".";

// load text from disk or network
read_text_from("test")
  // split the sentence into word tokens
  .then(tokenize)
  // generate n-grams mapping
  .then(to_n_grams(3))
  // lookup probabilities of the last word in the lexicon
  .then(lookup);
