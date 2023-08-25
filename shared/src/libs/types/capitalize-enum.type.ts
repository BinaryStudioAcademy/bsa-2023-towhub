type CapitalizeEnum<T extends object> = {
  [K in keyof T]: Capitalize<T[K]>;
};

export { type CapitalizeEnum };
