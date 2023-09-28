import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import { type OrderResponseDto } from '~/libs/types/types.js';

import { OrderListCardBusiness } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  orders: OrderResponseDto[];
  onSelect: ({ startPoint, endPoint }: PlaceLatLng) => void;
};

const OrderList: React.FC<Properties> = ({ orders, onSelect }: Properties) => {
  return (
    <ul className={styles.orderList}>
      {orders.map((order) => (
        <li key={order.id} className={styles.orderItem}>
          <OrderListCardBusiness order={order} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
};

export { OrderList };
