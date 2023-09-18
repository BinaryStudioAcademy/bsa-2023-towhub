import { IconName } from '~/libs/enums/enums.js';
import { type ColumnDef, type ValueOf } from '~/libs/types/types.js';

type Icons = {
  iconEdit: ValueOf<typeof IconName>;
  iconDelete: ValueOf<typeof IconName>;
};

type ReturnType<T> = {
  data: (T & Icons)[];
  columns: ColumnDef<T>[];
};

const addIconsToData = <T>(
  data: T[],
  columns: ColumnDef<T>[],
): ReturnType<T> => {
  const dataWithIcons = data.map((it) => ({
    ...it,
    iconEdit: IconName.EDIT,
    iconDelete: IconName.TRASH,
  }));
  const columnsWithIcons = [
    ...columns,
    {
      header: '',
      accessorKey: 'iconEdit',
      size: 50,
      enableResizing: false,
      enableSorting: false,
    },
    {
      header: '',
      accessorKey: 'iconDelete',
      size: 50,
      enableResizing: false,
      enableSorting: false,
    },
  ];

  return { data: dataWithIcons, columns: columnsWithIcons };
};

export { type Icons, addIconsToData };
