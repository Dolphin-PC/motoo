export type PartialRecord<K extends keyof any, T> = {
  // eslint-disable-next-line no-unused-vars
  [P in K]?: T;
};
