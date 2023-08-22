interface IService<T = unknown> {
  find(id: unknown): Promise<T>;
  create(payload: unknown): Promise<T>;
  update(parameters: { id: unknown; payload: unknown }): Promise<T>;
  delete(id: unknown): Promise<unknown>;
}

export { type IService };
