import { type ColumnDef } from '@tanstack/react-table';
import { getFullName } from 'shared/build';

import { ImgPath } from '~/libs/enums/enums.js';
import { type DriverWithUserData } from '~/libs/types/types.js';

const AVATAR_SIZE = 180;

const columns: ColumnDef<DriverWithUserData>[] = [
  {
    header: 'Full Name',
    accessorFn: (driver: DriverWithUserData) =>
      getFullName(driver.firstName, driver.lastName),
    footer: 'Full name',
    size: 250,
  },
  {
    header: 'Photo',
    accessorFn: (driver: DriverWithUserData): string => {
      return driver.driver.avatarUrl ?? ImgPath.AVATAR_DEFAULT;
    },
    footer: 'Photo',
    size: AVATAR_SIZE,
    cell: ({ getValue }) => (
      <img
        src={getValue() as string}
        alt="Driver Personal Avatar"
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
      />
    ),
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
