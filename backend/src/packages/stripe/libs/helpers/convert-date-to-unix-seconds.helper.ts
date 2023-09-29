import { MILLISECONDS_IN_SECOND } from './libs/constants/constants.js';

const convertDateToUnixSeconds = (date: Date): number => {
  return Math.floor(date.getTime() / MILLISECONDS_IN_SECOND);
};

export { convertDateToUnixSeconds };
