import { type OrderResponseDto } from '~/packages/orders/libs/types/types.js';

const useGetOrderData = (
  order: OrderResponseDto | null,
): {
  firstName: string;
  lastName: string;
  licensePlate: string;
  price: number | undefined;
} => {
  const { shift, price } = order ?? {};
  const { truck, driver } = shift ?? {};
  const { licensePlateNumber: licensePlate = '' } = truck ?? {};
  const { firstName: firstName = '', lastName: lastName = '' } = driver ?? {};

  return { firstName, lastName, licensePlate, price };
};

export { useGetOrderData };
