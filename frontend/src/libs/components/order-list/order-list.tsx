import { useCallback } from 'react';
import { type OrderResponseDto } from 'shared/build';

// import { OrderListCard } from '../order-list-card/order-list-card.js';
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
        const { id, startPoint: startLocation, endPoint: endLocation } = order;

        return (
          <li
            key={id}
            className={styles.orderItem}
            onMouseEnter={selectCard(startLocation, endLocation)}
          >
            {/* <OrderListCard order={order}></OrderListCard> */}
          </li>
        );
      })}
    </ul>
  );
};

export { OrderList };
