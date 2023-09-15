import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useCallback,
  useReactTable,
} from '~/libs/hooks/hooks.js';
import { type ColumnDef } from '~/libs/types/types.js';

import { Pagination } from '../pagination/pagination.jsx';
import { DEFAULT_COLUMN } from './libs/constant.js';
import styles from './styles.module.scss';

type Properties<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize: number;
  totalRow: number;
  pageIndex: number;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
};

const Table = <T,>({
  data,
  columns,
  totalRow,
  pageSize,
  pageIndex,
  changePageIndex,
  changePageSize,
}: Properties<T>): JSX.Element => {
  const pagesRange = Math.ceil(totalRow / pageSize);
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    defaultColumn: DEFAULT_COLUMN,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  const createThead = (): JSX.Element => (
    <thead className={styles.thead}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className={styles.tr}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={styles.th}
              style={{
                width: header.getSize(),
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              <div
                {...{
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: getValidClassNames(
                    styles.resizer,
                    header.column.getIsResizing() && styles.isResizing,
                  ),
                }}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  const createTbody = (): JSX.Element => (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className={styles.tr}>
          {row.getVisibleCells().map((cell, index) => (
            <td
              key={cell.id}
              className={getValidClassNames(
                styles.td,
                index === 0 && styles['text-left'],
              )}
              style={{
                width: cell.column.getSize(),
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <table
          className={styles.table}
          style={{
            width: table.getCenterTotalSize(),
          }}
        >
          {createThead()}
          {createTbody()}
        </table>
      </div>
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
