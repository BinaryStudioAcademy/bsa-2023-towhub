import { type Table } from '@tanstack/react-table';
import { type RowData } from '@tanstack/table-core/src/types';

import { Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { flexRender } from '~/libs/hooks/hooks.js';

import styles from '../../styles.module.scss';
import { checkIsActionCell, getCellClickHandler } from '../helpers/helpers.js';

type Properties<T> = {
  table: Table<T>;
  isTableEditable?: boolean;
  onEditClick?: (rowId: string) => void;
  onDeleteClick?: (rowId: string) => void;
};

const Tbody = <T extends RowData>({
  table,
  isTableEditable = false,
  ...properties
}: Properties<T>): JSX.Element => (
  <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr key={row.id} className={styles.tr}>
        {row.getVisibleCells().map((cell, index, array) => {
          const { isEditCell, isDeleteCell } = checkIsActionCell({
            isTableEditable,
            index,
            totalCellsInRow: array.length,
          });
          const shouldAddIconToCell = isEditCell || isDeleteCell;
          const iconToDisplay = isEditCell ? IconName.EDIT : IconName.TRASH;

          return (
            <td
              key={cell.id}
              className={getValidClassNames(
                styles.td,
                index === 0 && styles['text-left'],
                isEditCell && styles['icon-edit'],
                isDeleteCell && styles['icon-delete'],
              )}
              style={{
                width: cell.column.getSize(),
              }}
              onClick={getCellClickHandler({
                index,
                totalCellsInRow: array.length,
                isTableEditable,
                ...properties,
              })?.bind(null, row.id)}
            >
              {!shouldAddIconToCell &&
                flexRender(cell.column.columnDef.cell, cell.getContext())}
              {shouldAddIconToCell && (
                <Icon iconName={iconToDisplay} size="xl" />
              )}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

export { Tbody };
