import { type reducer as authReducer } from '~/slices/auth/auth.js';
import { type reducer as driverReducer } from '~/slices/driver/driver.js';
import { type reducer as driversReducer } from '~/slices/drivers/drivers.js';
import { type reducer as filesReducer } from '~/slices/files/files.js';
import { type reducer as ordersReducer } from '~/slices/orders/order.js';
import { type reducer as truckReducer } from '~/slices/trucks/trucks.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  trucks: ReturnType<typeof truckReducer>;
  files: ReturnType<typeof filesReducer>;
  orders: ReturnType<typeof ordersReducer>;
  drivers: ReturnType<typeof driversReducer>;
  driver: ReturnType<typeof driverReducer>;
};

export { type RootReducer };
