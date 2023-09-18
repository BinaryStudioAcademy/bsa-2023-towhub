import { type ColumnDef } from '~/libs/types/types.js';

type AddIconsToData<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const addIconsToData = <T>(
  data: T[],
  columns: ColumnDef<T>[],
): AddIconsToData<T> => {
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

  return { data, columns: columnsWithIcons };
};

export { addIconsToData };
