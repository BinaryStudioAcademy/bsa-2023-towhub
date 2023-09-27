import { MILLISECONDS_IN_SECOND } from './libs/constants/constants.js';

const convertUnixSecondsToDate = (seconds: number): Date => {
  return new Date(seconds * MILLISECONDS_IN_SECOND);
};

export { convertUnixSecondsToDate };
