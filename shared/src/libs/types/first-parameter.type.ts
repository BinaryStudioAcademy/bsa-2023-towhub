type FirstParameter<T> = T extends (
  ..._arguments: [infer Parameter, ...infer Rest]
) => unknown
  ? Parameter
  : never;

export { type FirstParameter };
