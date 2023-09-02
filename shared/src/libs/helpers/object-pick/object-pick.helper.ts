import pick from 'object.pick';

const objectPick = <T extends object, U extends keyof T>(
  object: T,
  keys: readonly U[],
): Pick<T, U> => {
  return pick(object, keys);
};

export { objectPick };
