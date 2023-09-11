import { SocketError } from '~/libs/packages/socket/libs/enums/enums.js';

import { TruckStatus } from '../../enums/enums.js';

const truckStatusToErrorMessage = {
  [TruckStatus.BUSY]: SocketError.TRUCK_BUSY,
  [TruckStatus.ACTIVE]: SocketError.TRUCK_ACTIVE,
  [TruckStatus.NOT_AVAILABLE]: SocketError.TRUCK_NOT_AVAILABLE,
} as const;

export { truckStatusToErrorMessage };
