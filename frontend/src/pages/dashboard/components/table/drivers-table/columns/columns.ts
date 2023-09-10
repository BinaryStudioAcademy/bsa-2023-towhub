import { type ColumnDef } from '@tanstack/react-table';

import { type DriverWithUserData } from '~/libs/types/types.js';

const columns: ColumnDef<DriverWithUserData>[] = [
  {
    header: 'Full Name',
    accessorFn: (driver) => `${driver.firstName} ${driver.lastName}`,
    footer: 'Full name',
    size: 250,
  },
  {
    header: 'Driver License Number',
    accessorKey: 'driver.driverLicenseNumber',
    footer: 'Driver License Number',
    size: 250,
  },
  {
    header: 'Created At',
    accessorFn: (driver): string | undefined => {
      if (!driver.driver.createdAt) {
        return;
      }

      return new Date(driver.driver.createdAt).toDateString();
    },
    footer: 'Phone',
    size: 250,
  },
];

export { columns };
