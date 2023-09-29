import { type ColumnDef } from '@tanstack/react-table';
import {
  type FileVerificationStatusValues,
  getFullName,
} from 'shared/build/index.js';

import { Badge } from '~/libs/components/components.js';
import { ImgPath } from '~/libs/enums/enums.js';
import { type DriverWithUserData } from '~/libs/types/types.js';
import { verificationStatusToReadableFormat } from '~/slices/driver/libs/maps/maps.js';

import { COLUMN_AVATAR_SIZE } from '../libs/constants/constants.js';
import { verificationStatusToBadgeColor } from '../libs/maps/maps.js';
import style from '../styles.module.scss';

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
    size: COLUMN_AVATAR_SIZE,
    cell: ({ getValue }) => (
      <img
        src={getValue() as string}
        alt="Driver Personal Avatar"
        width={COLUMN_AVATAR_SIZE}
        height={COLUMN_AVATAR_SIZE}
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
  {
    header: 'Verification status',
    accessorFn: ({ driver }: DriverWithUserData): string => {
      return driver.verificationStatus
        ? verificationStatusToReadableFormat[driver.verificationStatus.status]
        : '';
    },
    footer: 'Verification status',
    cell: ({ getValue }): JSX.Element => (
      <Badge
        className={style.verificationBadge}
        color={
          verificationStatusToBadgeColor[
            getValue() as FileVerificationStatusValues
          ]
        }
      >
        {getValue() as string}
      </Badge>
    ),
    size: 303,
  },
];

export { columns };
