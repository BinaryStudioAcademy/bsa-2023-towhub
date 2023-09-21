import {
  type AnyColumn,
  type SQL,
  type SQLWrapper,
  asc,
  desc,
} from 'drizzle-orm';

import { SortMethod } from '../enums/enums.js';
import { type SortMethodValue } from '../types/types.js';

type ColumnToSorted = SQLWrapper | AnyColumn;

const getSortedBy = (
  sortedMethod: SortMethodValue | null,
  requiredColumnToSorted: ColumnToSorted,
  optionalColumnToSorted: ColumnToSorted,
): SQL[] => {
  const sortedBy = [desc(requiredColumnToSorted)];

  if (sortedMethod === SortMethod.ASC) {
    sortedBy.unshift(asc(optionalColumnToSorted));
  }

  if (sortedMethod === SortMethod.DESC) {
    sortedBy.unshift(desc(optionalColumnToSorted));
  }

  return sortedBy;
};

export { getSortedBy };
