import { type LightColor } from '~/libs/types/color.type';
import { CustomerOrderStatus } from '~/pages/customer-history/libs/types/types.js';

const convertDate = (ISOString: string): string => {
  const dateString = new Date(ISOString).toDateString();
  const [, month, day, year] = dateString.split(' ');

  return `${day} ${month}. ${year}`;
};

const getBadgeColorByStatus = (status: string): LightColor => {
  return status === CustomerOrderStatus.DONE
    ? 'green-extra-light'
    : 'red-extra-light';
};

export { convertDate, getBadgeColorByStatus };
