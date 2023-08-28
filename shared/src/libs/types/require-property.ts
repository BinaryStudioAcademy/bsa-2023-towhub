type RequireProperty<T extends object, K extends keyof T = keyof T> = T &
  Pick<T, K>;

export { type RequireProperty };
