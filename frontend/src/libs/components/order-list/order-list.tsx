import { type OrderResponseDto } from 'shared/build';

import { OrderCard } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  orders: OrderResponseDto[];
};

const OrderList: React.FC<Properties> = ({ orders }: Properties) => {
  return (
    <ul>
      {orders.map((order) => {
        const {
          id,
          startPoint: startLocation,
          endPoint: endLocation,
          shift: { driver, truck },
        } = order;
        const driverProperty = {
          firstName: driver?.firstName as string,
          lastName: driver?.lastName as string,
          profileURL:
            'https://qph.cf2.quoracdn.net/main-thumb-97945175-200-uwsogrwpgplqopsksieeysyifvfvwiaj.jpeg',
        };
        const truckProperty = {
          licensePlate: truck?.licensePlateNumber as string,
        };
        const initialStatus = { startLocation, endLocation };
        const currentStatus = {
          timespanLastUpdated: 'timespanLastUpdated',
          location: 'location',
          distanceLeft: 1000,
          timespanLeft: 'timespanLeft',
        };

        return (
          <li key={id} className={styles.orderList}>
            <OrderCard
              driver={driverProperty}
              truck={truckProperty}
              initialStatus={initialStatus}
              currentStatus={currentStatus}
            ></OrderCard>
          </li>
        );
      })}
    </ul>
  );
};

export { OrderList };
