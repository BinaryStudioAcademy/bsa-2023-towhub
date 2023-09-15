import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as orderReducer } from '~/slices/orders/orders.js';
import { type reducer as truckReducer } from '~/slices/trucks/trucks.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  trucks: ReturnType<typeof truckReducer>;
  orders: ReturnType<typeof orderReducer>;
};

export { type RootReducer };
