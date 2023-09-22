import { type Table } from '@tanstack/react-table';
import { type RowData } from '@tanstack/table-core/src/types';

import { Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { flexRender } from '~/libs/hooks/hooks.js';

import styles from '../../styles.module.scss';

type Properties<T> = {
  table: Table<T>;
};

const Thead = <T extends RowData>({ table }: Properties<T>): JSX.Element => (
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
              : flexRender(header.column.columnDef.header, header.getContext())}
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

export { Thead };
