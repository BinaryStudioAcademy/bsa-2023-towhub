import { OrderCard } from '~/libs/components/components.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { actions } from '~/slices/orders/orders.js';
import { selectOrder } from '~/slices/orders/selectors.js';

import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrder);

  useEffect(() => {
    if (orderId) {
      void dispatch(actions.getOrder(orderId));
    }
  }, [orderId, dispatch]);

  return (
    <div className={styles.container}>
      {order && (
        <>
          <OrderStatus status={order.status} className={styles.status} />
          <OrderCard
            driver={{
              firstName: order.driver.firstName,
              lastName: order.driver.lastName,
              profileURL: 'https://i.pravatar.cc/300',
            }}
            truck={{ licensePlate: 'GB 555' }}
            initialStatus={{
              startLocation: order.startPoint,
              endLocation: order.endPoint,
            }}
            currentStatus={{
              timespanLastUpdated: '30 seconds',
              location: 'Birmingham',
              distanceLeft: 12,
              timespanLeft: '1 hrs 24 mins',
            }}
            className={styles.card}
          />
        </>
      )}
    </div>
  );
};

export { OrderPage as Order };
