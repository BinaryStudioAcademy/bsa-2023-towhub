import { useCallback } from 'react';
import { type OrderResponseDto } from 'shared/build';

import { OrderCard } from '../components.js';
import { makeLatLngLiteral } from '../orders/libs/helpers/make-lat-lng-literal.helper.js';
import styles from './styles.module.scss';

type Properties = {
  orders: OrderResponseDto[];
  select: ({
    startPoint,
    endPoint,
  }: {
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }) => void;
};

const OrderList: React.FC<Properties> = ({ orders, select }: Properties) => {
  const selectCard = useCallback(
    (startLocation: string, endLocation: string) => () =>
      select({
        startPoint: makeLatLngLiteral(startLocation),
        endPoint: makeLatLngLiteral(endLocation),
      }),
    [select],
  );

  return (
    <ul className={styles.orderList}>
      {orders.map((order) => {
        const {
          id,
          startPoint: startLocation,
          endPoint: endLocation,
          shift: { driver, truck },
        } = order;
        const driverProperty = {
          firstName: driver.firstName,
          lastName: driver.lastName,
          profileURL:
            'https://qph.cf2.quoracdn.net/main-thumb-97945175-200-uwsogrwpgplqopsksieeysyifvfvwiaj.jpeg',
        };
        const truckProperty = {
          licensePlate: truck.licensePlateNumber,
        };
        const initialStatus = { startLocation, endLocation };
        const currentStatus = {
          timespanLastUpdated: 'timespanLastUpdated',
          location: 'location',
          distanceLeft: 1000,
          timespanLeft: 'timespanLeft',
        };

        return (
          <li
            key={id}
            className={styles.orderItem}
            onMouseEnter={selectCard(startLocation, endLocation)}
          >
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
