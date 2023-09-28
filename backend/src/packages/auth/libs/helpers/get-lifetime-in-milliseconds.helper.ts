import { TimeConstants } from '../enums/enums.js';

const getLifetimeInMilliseconds = (time: string): number => {
  return (
    Number.parseInt(time) *
    TimeConstants.MINUTES_IN_HOUR *
    TimeConstants.SECONDS_IN_MINUTE *
    TimeConstants.MILLISECONDS_IN_SECOND
  );
};

export { getLifetimeInMilliseconds };
