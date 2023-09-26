import { Button } from '~/libs/components/components.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectOrder } from '~/slices/orders/selectors.js';

import { NotFound } from '../pages.js';
import { useGetRouteData } from './libs/hooks/use-get-route-data.hook.js';
import { useSubscribeUpdates } from './libs/hooks/use-subscribe-order.hook.js';
import styles from './styles.module.scss';

// TODO: REMOVE MOCK
const MOCK_ORDER_DETAILS = {
  comment:
    'Hi! I`m near the bridge. There was a small accident. The car must be towed out of the ditch.',
};

const DriverOrder = (): JSX.Element => {
  const { orderId } = useParams();
  const order = useAppSelector(selectOrder);
  const { timespanLeft, distanceLeft, startPoint, endPoint } =
    useGetRouteData(order);
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>();

  const mapReference = useRef<HTMLDivElement>(null);
  useAppMap({
    center: startPoint as google.maps.LatLngLiteral,
    destination: endPoint as google.maps.LatLngLiteral,
    mapReference: mapReference,
  });
  useSubscribeUpdates(`${orderId as string}`);

  useEffect(() => {
    if (order) {
      void dispatch(
        orderActions.getRouteData({
          origin: order.startPoint,
          destination: order.endPoint,
        }),
      );
    }
  }, [dispatch, order]);

  const handleAccept = useCallback(() => {
    setMessage('Order Accepted');
    notification.success('Order Accepted');
  }, [setMessage]);

  const handleDecline = useCallback(() => {
    setMessage('Order Declined');
    notification.warning('Order Declined');
  }, [setMessage]);

  if (!order) {
    return <NotFound />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <div className={styles.tripInfo}>
          <p className={styles.header}>TRIP INFO</p>
          <div className={styles.tripInfoContent}>
            <span className={styles.item}>Distance: {distanceLeft}</span>
            <span className={styles.item}>Time: {timespanLeft}</span>
            <span className={styles.item}>Price: ${order.price}</span>
          </div>
        </div>
        <div className={styles.orderDetails}>
          <p className={styles.header}>ORDER DETAILS</p>
          <div>
            <p className={styles.detail}>
              <Icon className={styles.userIcon} iconName="user" /> Customer
              name: <span className={styles.value}>{order.customerName}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles.phoneIcon} iconName="phone" /> Phone:{' '}
              <span className={styles.value}>{order.customerPhone}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles.timeIcon} iconName="clock" /> Time:{' '}
              <span className={styles.value}>
                {new Date(order.scheduledTime).toLocaleString()}
              </span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles.locationIcon} iconName="location dot" />{' '}
              Location: <span className={styles.value}>{order.startPoint}</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={styles.destinationIcon}
                iconName="location dot"
              />{' '}
              Destination:{' '}
              <span className={styles.value}>{order.endPoint}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles.carIcon} iconName="car" /> Cars need to be
              towed: <span className={styles.value}>{order.carsQty}</span>
            </p>
          </div>
          <p className={styles.commentHeader}>Comment:</p>
          <p className={styles.commentContent}>{MOCK_ORDER_DETAILS.comment}</p>
          <div className={styles.buttons}>
            {message ? (
              <p className={styles.message}>{message}</p>
            ) : (
              <>
                <Button
                  className={styles.button}
                  label={'Decline'}
                  onClick={handleDecline}
                />
                <Button
                  className={getValidClassNames(styles.button, styles.accept)}
                  label={'Accept'}
                  onClick={handleAccept}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div ref={mapReference} id="map" className={styles.map} />
      </div>
    </section>
  );
};

export { DriverOrder };
