import { ApiPath } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/http-api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { type OrderWithDriverEntity } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class OrderApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ORDERS, baseUrl, http, storage });
  }

  public async getOrder(orderId: string): Promise<OrderWithDriverEntity> {
    //Mock
    return await Promise.resolve({
      id: Number(orderId),
      price: 100,
      scheduledTime: '2023-08-31T05:14:13.67',
      carsQty: 1,
      startPoint: 'London',
      endPoint: 'Paris',
      status: 'pending',
      userId: 1,
      businessId: 1,
      driverId: 1,
      customerName: 'Bob',
      customerPhone: '+123456789',
      driver: {
        driverLicenseNumber: 'license-number-555',
        user: {
          firstName: 'John',
          lastName: 'Drivefast',
        },
      },
    });
  }
}

export { OrderApi };
