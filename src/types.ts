export type ValueOf<T> = T extends Record<any, infer V> ? V : never;

export type Lexicon = Record<string, { [key: string]: number }[]>;
