export type ValueOf<T> = T extends Record<any, infer V> ? V : never;

export type Lexicon = Record<string, Record<string, number>>;

export type Suggest = {
  word: string;
  weight: number;
};
