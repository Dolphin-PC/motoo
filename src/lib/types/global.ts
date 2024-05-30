export type PartialRecord<K extends keyof any, T> = {
  // eslint-disable-next-line no-unused-vars
  [P in K]?: T;
};

export type TSign = "1" | "2" | "3" | "4" | "5" | null;
