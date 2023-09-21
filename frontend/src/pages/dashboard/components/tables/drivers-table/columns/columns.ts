import { type ColumnDef } from '@tanstack/react-table';
import { getFullName } from 'shared/build';

import { type DriverWithUserData } from '~/libs/types/types.js';

const columns: ColumnDef<DriverWithUserData>[] = [
  {
    header: 'Full Name',
    accessorFn: (driver: DriverWithUserData) =>
      getFullName(driver.firstName, driver.lastName),
    footer: 'Full name',
    size: 250,
  },
  {
    header: 'Driver License Number',
    accessorKey: 'driver.driverLicenseNumber',
    footer: 'Driver License Number',
    size: 300,
  },
  {
    header: 'Created At',
    accessorFn: (driver: DriverWithUserData): string => {
      return new Date(driver.driver.createdAt).toDateString();
    },
    footer: 'Created At',
    size: 303,
  },
];

export { columns };
