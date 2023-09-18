import { type OnChangeFn, type SortingState } from '@tanstack/react-table';

import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useCallback,
  useMemo,
  useReactTable,
} from '~/libs/hooks/hooks.js';
import { type ColumnDef } from '~/libs/types/types.js';

import { Icon } from '../components.js';
import { Pagination } from '../pagination/pagination.jsx';
import { DEFAULT_COLUMN } from './libs/constant.js';
import {
  type Icons,
  addIconsToData,
} from './libs/helpers/add-icons-to-data.helper.js';
import styles from './styles.module.scss';

type Properties<T> = {
  data: T[];
  isLoading?: boolean;
  isTableEditable?: boolean;
  columns: ColumnDef<T>[];
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
  isTableEditable = false,
  sorting,
  setSorting,
  changePageIndex,
  changePageSize,
  onEditClick,
  onDeleteClick,
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
  const createThead = (): JSX.Element => (
    <thead className={styles.thead}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className={styles.tr}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={getValidClassNames(
                styles.th,
                header.column.getCanSort() && styles.sorting,
                header.column.getIsSorted() && styles.sorted,
              )}
              style={{
                width: header.getSize(),
              }}
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              {{
                asc: <Icon iconName={IconName.CHEVRON_UP} />,
                desc: <Icon iconName={IconName.CHEVRON_DOWN} />,
              }[header.column.getIsSorted() as string] ?? null}
              <div
                {...(header.column.getCanResize() && {
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: getValidClassNames(
                    styles.resizer,
                    header.column.getIsResizing() && styles.isResizing,
                  ),
                })}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  const getHandler = (
    index: number,
    arrayLength: number,
  ): typeof onEditClick | typeof onDeleteClick => {
    if (isTableEditable && index === arrayLength - 2) {
      return onEditClick;
    } else if (isTableEditable && index === arrayLength - 1) {
      return onDeleteClick;
    }
  };

  const createTbody = (): JSX.Element => (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        const rowWithIcons = row.original as T & Icons;

        return (
          <tr key={row.id} className={styles.tr}>
            {row.getVisibleCells().map((cell, index, array) => {
              const isEditIconCell =
                isTableEditable && index === array.length - 2;
              const isDeleteIconCell =
                isTableEditable && index === array.length - 1;
              let icon = null;

              if (isEditIconCell) {
                icon = rowWithIcons.iconEdit;
              } else if (isDeleteIconCell) {
                icon = rowWithIcons.iconDelete;
              }

              return (
                <td
                  key={cell.id}
                  className={getValidClassNames(
                    styles.td,
                    index === 0 && styles['text-left'],
                    isEditIconCell && styles['icon-edit'],
                    isDeleteIconCell && styles['icon-delete'],
                  )}
                  style={{
                    width: cell.column.getSize(),
                  }}
                  onClick={getHandler(index, array.length)?.bind(null, row.id)}
                >
                  {!icon &&
                    flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {icon && <Icon iconName={icon} size="xl" />}
                </td>
              );
            })}
          </tr>
        );
      })}
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
