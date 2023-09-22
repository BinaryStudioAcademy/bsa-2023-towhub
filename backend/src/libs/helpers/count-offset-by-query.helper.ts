import { type PaginationParameters } from '../types/types.js';

const countOffsetByQuery = ({ page, size }: PaginationParameters): number => {
  return page * size;
};

export { countOffsetByQuery };
