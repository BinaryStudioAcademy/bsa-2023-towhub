interface IRepository<T = unknown> {
  find(id:unknown): Promise<T>;
  create(entity: unknown): Promise<T>;
  update(parameters:{ id:unknown,payload:unknown }): Promise<T>;
  delete(id:unknown): Promise<boolean>;
}

export { type IRepository };
