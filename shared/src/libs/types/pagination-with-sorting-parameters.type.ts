import { type PaginationParameters } from './pagination-parameters.type.js';
import { type SortMethodValue } from './sort-method-value.type.js';

type PaginationWithSortingParameters = PaginationParameters & {
  sort: SortMethodValue | null;
};

export { type PaginationWithSortingParameters };
