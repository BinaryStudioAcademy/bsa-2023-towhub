import { type DriverDto } from '../types.js';

type DriverUpdateRequestDto<FileType> = DriverDto & {
  password: string;
  truckIds?: number[];
  files: FileType[];
};

export { type DriverUpdateRequestDto };
