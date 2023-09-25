import { PATH_SEPARATOR } from '../constants/constants.js';

const constructKey = (uuid: string, folder = ''): string => {
  return [folder, uuid].join(PATH_SEPARATOR);
};

export { constructKey };
