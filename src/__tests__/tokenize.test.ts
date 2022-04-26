import { tokenize } from "../tokenize";

describe("fn tokenize: split the sentence into word tokens", () => {
  test(`passing line with punctuation, should return tokens`, () => {
    const testcase = `'Good evening, mother.`;
    const expected = ["'", "Good", "evening", ",", "mother", "."];
    expect(tokenize(testcase)).toStrictEqual(expected);
  });

  test(`passing multi-line, should return tokens`, () => {
    const testcase = `
'No, no!' said the king; 'you must not be in such a hurry. Wait till you
have done some great deed. My father did not let me marry till I had won
the golden sword you see me wear.'
`;

    // prettier-ignore
    const expected = [
      "'",      'No',     ',',     'no',    '!',
      "'",      'said',   'the',   'king',  ';',
      "'",      'you',    'must',  'not',   'be',
      'in',     'such',   'a',     'hurry', '.',
      'Wait',   'till',   'you',   'have',  'done',
      'some',   'great',  'deed',  '.',     'My',
      'father', 'did',    'not',   'let',   'me',
      'marry',  'till',   'I',     'had',   'won',
      'the',    'golden', 'sword', 'you',   'see',
      'me',     'wear',   '.',     "'"
    ];

    expect(tokenize(testcase)).toStrictEqual(expected);
  });
});
