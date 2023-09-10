type EntityPagination<T> = {
  items: T[];
  total: number;
};

type PaginationPayload = {
  pageSize: number;
  pageIndex: number;
};

export { type EntityPagination, type PaginationPayload };
