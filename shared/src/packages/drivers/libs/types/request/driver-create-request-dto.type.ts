import { type DriverDto } from '../types.js';

type DriverCreateRequestDto<FileType> = DriverDto & {
  truckIds: number[];
  files: FileType[];
};

export { type DriverCreateRequestDto };
