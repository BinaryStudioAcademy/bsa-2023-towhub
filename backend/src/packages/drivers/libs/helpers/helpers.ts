import { type DriverEntity } from '../../driver.entity.js';
import { type DriverWithUserData } from '../types/types.js';

const convertToDriverUser = (driver: DriverEntity): DriverWithUserData => {
  const { user, ...pureDriver } = driver.toObjectWithUser();
  const { id, phone, email, firstName, lastName, groupId } = user;

  return { id, phone, email, firstName, lastName, groupId, driver: pureDriver };
};

const countOffsetByQuery = ({
  page,
  size,
}: {
  page: number;
  size: number;
}): number => {
  return page * size;
};

export { convertToDriverUser, countOffsetByQuery };
