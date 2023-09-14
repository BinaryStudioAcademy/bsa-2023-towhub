import { capitalizeFirstLetter } from '~/libs/helpers/helpers.js';
import { type ColumnDef, type TruckEntity } from '~/libs/types/types.js';

const columns: ColumnDef<TruckEntity>[] = [
  {
    header: 'Manufacturer',
    accessorFn: (trucks): string => capitalizeFirstLetter(trucks.manufacturer),
    footer: 'Manufacturer',
    size: 200,
  },
  {
    header: 'Tow Type',
    accessorFn: (trucks): string => capitalizeFirstLetter(trucks.towType),
    footer: 'Tow Type',
    size: 200,
  },
  {
    header: 'Year',
    accessorFn: (trucks) => trucks.year,
    footer: 'Year',
    size: 200,
  },
  {
    header: 'Plate Number',
    accessorFn: (trucks): string => trucks.licensePlateNumber,
    footer: 'Plate Number',
    size: 200,
  },
  {
    header: 'Capacity',
    accessorFn: (trucks) => trucks.capacity,
    footer: 'Capacity',
    size: 200,
  },
  {
    header: 'Price Per Km',
    accessorFn: (trucks) => trucks.pricePerKm,
    footer: 'Price Per Km',
    size: 200,
  },
  {
    header: 'Created At',
    accessorFn: (trucks): string | undefined => {
      return new Date(trucks.createdAt).toDateString();
    },
    footer: 'Phone',
    size: 200,
  },
];

export { columns };