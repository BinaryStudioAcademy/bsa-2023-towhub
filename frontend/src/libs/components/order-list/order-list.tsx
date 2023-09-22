import { type OrderResponseDto } from '~/libs/types/types.js';

import { OrderListCardBusiness } from '../components.js';
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
  return (
    <ul className={styles.orderList}>
      {orders.map((order) => (
        <li key={order.id} className={styles.orderItem}>
          <OrderListCardBusiness order={order} select={select} />
        </li>
      ))}
    </ul>
  );
};

export { OrderList };
