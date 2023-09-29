import { DriverOrderCard } from '~/libs/components/components.js';
import { useAppDispatch, useEffect } from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/order.js';

import { type OrderResponseDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
  orders: OrderResponseDto[];
};

const DriverOrderList = ({ orders }: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNames = (): void => {
      for (const { id, startPoint, endPoint } of orders) {
        void dispatch(
          orderActions.getRouteAddresses({
            orderId: id,
            points: { origin: startPoint, destination: endPoint },
          }),
        );
      }
    };
    getNames();
  }, [dispatch, orders]);

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id} className={styles.item}>
          <DriverOrderCard order={order} />
        </li>
      ))}
    </ul>
  );
};

export { DriverOrderList };
