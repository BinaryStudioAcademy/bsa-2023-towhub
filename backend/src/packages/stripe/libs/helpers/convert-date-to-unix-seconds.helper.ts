import { MILLISECONDS_IN_SECOND } from './libs/consts/consts.js';

const convertDateToUnixSeconds = (date: Date): number => {
  return Math.floor(date.getTime() / MILLISECONDS_IN_SECOND);
};

export { convertDateToUnixSeconds };
