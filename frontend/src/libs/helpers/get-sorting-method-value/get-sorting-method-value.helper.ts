import { type ColumnSort } from '@tanstack/react-table';

import { type SortMethodValue } from '~/libs/types/types.js';

const getSortingMethodValue = (sorting: ColumnSort | null): SortMethodValue => {
  return sorting?.desc ? 'desc' : 'asc';
};

export { getSortingMethodValue };
