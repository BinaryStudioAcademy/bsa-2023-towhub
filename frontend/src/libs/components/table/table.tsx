import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '~/libs/hooks/hooks.js';
import { type ColumnDef } from '~/libs/types/types.js';

import { Pagination } from '../pagination/pagination.jsx';
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const createThead = (): JSX.Element => (
    <thead className={styles.thead}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className={styles.tr}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className={styles.th}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
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
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className={styles.td}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        {createThead()}
        {createTbody()}
      </table>
      <Pagination
        pageCount={pagesRange}
        onClick={changePageIndex}
        onChangePageSize={changePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export { Table };
