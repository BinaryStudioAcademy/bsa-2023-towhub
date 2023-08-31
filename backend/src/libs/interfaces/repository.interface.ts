interface IRepository<T = unknown> {
  // This is the core search method, supposed to lookup by combination of fields
  // Does not guarantee unique result, thus returns an array
  find(partial: Partial<T>): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(id: unknown): Promise<boolean>;
}

export { type IRepository };
