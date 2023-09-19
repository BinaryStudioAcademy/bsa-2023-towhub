import { type OnChangeFn, type SortingState } from '@tanstack/react-table';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useCallback,
  useMemo,
  useReactTable,
} from '~/libs/hooks/hooks.js';
import { type ColumnDef } from '~/libs/types/types.js';

import { Spinner } from '../components.js';
import { Pagination } from '../pagination/pagination.jsx';
import { Tbody, Thead } from './libs/components/components.js';
import { DEFAULT_COLUMN } from './libs/constant.js';
import { addIconsToData } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties<T> = {
  data: T[];
  isLoading?: boolean;
  isTableEditable?: boolean;
  columns: ColumnDef<T>[];
  emptyTableMessage?: JSX.Element;
  pageSize: number;
  totalRow: number;
  pageIndex: number;
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  onEditClick?: (rowId: string) => void;
  onDeleteClick?: (rowId: string) => void;
};

const Table = <T,>({
  data,
  columns,
  totalRow,
  pageSize,
  pageIndex,
  isLoading = false,
  emptyTableMessage,
  isTableEditable = false,
  sorting,
  setSorting,
  changePageIndex,
  changePageSize,
  ...properties
}: Properties<T>): JSX.Element => {
  const pagesRange = Math.ceil(totalRow / pageSize);
  const dataAndColumns = useMemo(() => {
    return isTableEditable ? addIconsToData(data, columns) : { data, columns };
  }, [columns, data, isTableEditable]);
  const table = useReactTable({
    ...dataAndColumns,
    columnResizeMode: 'onChange',
    defaultColumn: DEFAULT_COLUMN,
    state: {
      sorting,
    },
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const handleChangePageSize = useCallback(
    (value: number) => {
      changePageIndex(0);
      changePageSize(value);
      table.setPageSize(value);
    },
    [changePageSize, table, changePageIndex],
  );

  if (data.length === 0 && !isLoading) {
    return (
      <div className={getValidClassNames('h4', styles.message)}>
        {emptyTableMessage ?? 'There are no data here yet.'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          <table
            className={styles.table}
            style={{
              width: table.getCenterTotalSize(),
            }}
          >
            <Thead table={table} />
            <Tbody
              table={table}
              isTableEditable={isTableEditable}
              {...properties}
            />
          </table>
        </div>
      )}
      <Pagination
        pageCount={pagesRange}
        onClick={changePageIndex}
        onChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export { Table };
