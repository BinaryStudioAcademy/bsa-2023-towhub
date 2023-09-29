import {
  type OrderResponseDto,
  type OrderResponseWithAvatarDto,
} from '~/packages/orders/libs/types/types.js';

const useGetOrderData = (
  order: (OrderResponseDto | OrderResponseWithAvatarDto) | null,
): {
  firstName: string;
  lastName: string;
  licensePlate: string;
  price: number | undefined;
  avatarUrl: string | null;
} => {
  const { shift, price } = order ?? {};
  const { truck, driver } = shift ?? {};
  const { licensePlateNumber: licensePlate = '' } = truck ?? {};
  const {
    firstName: firstName = '',
    lastName: lastName = '',
    avatarUrl: avatarUrl = null,
  } = (driver as OrderResponseWithAvatarDto['shift']['driver']) ?? {};

  return { firstName, lastName, licensePlate, price, avatarUrl };
};

export { useGetOrderData };
