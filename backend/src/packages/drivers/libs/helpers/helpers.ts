import {
  type DriverWithUserData,
  HttpCode,
  HttpError,
  HttpMessage,
} from 'shared/build/index.js';

import { type DriverEntity } from '../../driver.entity.js';

const convertToDriverUser = (driver: DriverEntity): DriverWithUserData => {
  const { user, ...pureDriver } = driver.toObjectWithUser();

  if (!user) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpMessage.DRIVER_DOES_NOT_EXIST,
    });
  }
  const { id, phone, email, firstName, lastName, groupId } = user;

  return { id, phone, email, firstName, lastName, groupId, driver: pureDriver };
};

export { convertToDriverUser };
