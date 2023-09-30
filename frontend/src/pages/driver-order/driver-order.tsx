import { Button, Spinner } from '~/libs/components/components.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useRef,
} from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type Coordinates } from '~/libs/types/types.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectDataStatus, selectOrder } from '~/slices/orders/selectors.js';

import { NotFound } from '../pages.js';
import { OrderStatus } from './libs/enums/order-status.enum.js';
import { useGetRouteData, useSubscribeUpdates } from './libs/hooks/hooks.js';
import styles from './styles.module.scss';

const DriverOrder = (): JSX.Element => {
  const { orderId } = useParams();
  const order = useAppSelector(selectOrder);
  const dataStatus = useAppSelector(selectDataStatus);
  const navigate = useNavigate();
  const { timespanLeft, distanceLeft, origin, destination } =
    useGetRouteData(order);
  const dispatch = useAppDispatch();

  const mapReference = useRef<HTMLDivElement | null>(null);

  useAppMap({
    center: order?.startPoint as Coordinates,
    destination: order?.endPoint as Coordinates,
    mapReference: mapReference,
  });
  useSubscribeUpdates(`${orderId as string}`);

  useEffect(() => {
    if (orderId && !order) {
      void dispatch(orderActions.getOrder(orderId));
    }
  }, [orderId, dispatch, order]);

  const handleAccept = useCallback(() => {
    void dispatch(
      orderActions.changeAcceptOrderStatusByDriver({
        newStatus: OrderStatus.CONFIRMED,
        orderId: orderId as string,
      }),
    );
  }, [dispatch, orderId]);

  const handleConfirm = useCallback(() => {
    void dispatch(
      orderActions.changeAcceptOrderStatusByDriver({
        newStatus: OrderStatus.PICKING_UP,
        orderId: orderId as string,
      }),
    );
  }, [dispatch, orderId]);

  const handleComplete = useCallback(() => {
    void dispatch(
      orderActions.changeAcceptOrderStatusByDriver({
        newStatus: OrderStatus.DONE,
        orderId: orderId as string,
      }),
    );
  }, [dispatch, orderId]);

  const handleDecline = useCallback(() => {
    void dispatch(
      orderActions.changeAcceptOrderStatusByDriver({
        newStatus: OrderStatus.REJECTED,
        orderId: orderId as string,
      }),
    );
    notification.warning('Order Declined');
  }, [dispatch, orderId]);

  const handleRedirectToHomepage = useCallback(() => {
    if (orderId) {
      dispatch(orderActions.removeOrder(orderId));
      navigate(AppRoute.ORDERS);
    }
  }, [dispatch, navigate, orderId]);

  const getButtons = useCallback(() => {
    switch (order?.status) {
      case OrderStatus.PENDING: {
        return (
          <>
            <Button
              className={styles.button}
              label="Decline"
              onClick={handleDecline}
            />
            <Button
              className={getValidClassNames(styles.button, styles.accept)}
              label="Accept"
              onClick={handleAccept}
            />
          </>
        );
      }
      case OrderStatus.CONFIRMED: {
        return (
          <>
            <Button
              className={styles.button}
              label="Cancel order"
              onClick={handleDecline}
            />
            <Button
              className={getValidClassNames(styles.button, styles.accept)}
              label="I am in a place"
              onClick={handleConfirm}
            />
          </>
        );
      }
      case OrderStatus.PICKING_UP: {
        return (
          <Button
            className={getValidClassNames(
              styles.button,
              styles.accept,
              styles.complete,
            )}
            label="Complete order"
            onClick={handleComplete}
          />
        );
      }
      case OrderStatus.CANCELED:
      case OrderStatus.DONE:
      case OrderStatus.REJECTED: {
        return (
          <Button
            className={styles.complete}
            label="Homepage"
            onClick={handleRedirectToHomepage}
          />
        );
      }
    }
  }, [
    order?.status,
    handleDecline,
    handleAccept,
    handleConfirm,
    handleComplete,
    handleRedirectToHomepage,
  ]);

  if (dataStatus === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!order) {
    return <Spinner />;
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
          <div className={styles.details}>
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
              Location: <span className={styles.value}>{origin}</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={styles.destinationIcon}
                iconName="location dot"
              />{' '}
              Destination: <span className={styles.value}>{destination}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles.carIcon} iconName="car" /> Cars need to be
              towed: <span className={styles.value}>{order.carsQty}</span>
            </p>
          </div>
          <div className={styles.buttons}>{getButtons()}</div>
        </div>
      </div>
      <div className={styles.right}>
        <div ref={mapReference} id="map" className={styles.map} />
      </div>
    </section>
  );
};

export { DriverOrder };
