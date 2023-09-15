import { type OrderEntity } from './order-entity.type.js';

type OrderCreateResponseDto = Omit<OrderEntity, 'userId'> & {
  // shift: {
  //   id: OrderEntity['shiftId'];
  //   driverId: OrderEntity['driverId'];
  //   truckId: OrderEntity['truckId'];
  // };
};

export { type OrderCreateResponseDto };
