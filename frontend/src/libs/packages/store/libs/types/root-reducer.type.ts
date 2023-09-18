import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as filesReducer } from '~/slices/files/files.js';
import { type reducer as ordersReducer } from '~/slices/orders/order.js';
import { type reducer as truckReducer } from '~/slices/trucks/trucks.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  trucks: ReturnType<typeof truckReducer>;
  files: ReturnType<typeof filesReducer>;
  orders: ReturnType<typeof ordersReducer>;
};

export { type RootReducer };
