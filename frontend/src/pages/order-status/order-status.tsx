import { OrderCard, Spinner } from '~/libs/components/components.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
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
import { DEFAULT_CENTER } from '~/libs/packages/map/libs/constants/constants.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectDataStatus, selectOrder } from '~/slices/orders/selectors.js';
import {
  selectChosenTruck,
  selectTruckLocation,
} from '~/slices/trucks/selectors.js';

import { NotFound } from '../pages.js';
import { ButtonsSection } from './libs/components/components.js';
import { OrderStatus as OrderStatusValue } from './libs/enums/enums.js';
import { useGetOrderData } from './libs/hooks/use-get-order-data.hook.js';
import { useGetRouteData } from './libs/hooks/use-get-route-data.hook.js';
import { useSubscribeUpdates } from './libs/hooks/use-subscribe-updates.hook.js';
import styles from './styles.module.scss';

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const mapReference = useRef<HTMLDivElement>(null);
  const order = useAppSelector(selectOrder);

  const dataStatus = useAppSelector(selectDataStatus);
  const dispatch = useAppDispatch();

  const status = order?.status;
  const isCancelScreenOpen =
    status === OrderStatusValue.CANCELED ||
    status === OrderStatusValue.REJECTED;
  const isConfirmScreenOpen = status === OrderStatusValue.CONFIRMED;
  const isPickingUpScreenOpen = status === OrderStatusValue.PICKING_UP;
  const isDoneScreenOpen = status === OrderStatusValue.DONE;

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.getOrder(orderId));
    }
  }, [orderId, dispatch]);

  const truckId =
    useAppSelector(selectChosenTruck)?.id ?? order?.shift.truck?.id;
  useSubscribeUpdates(orderId, truckId);

  const truckLocation = useAppSelector(selectTruckLocation);

  useAppMap({
    center: truckLocation ?? DEFAULT_CENTER,
    destination: order ? order.startPoint : null,
    mapReference: mapReference,
    onMapLoad: () => true,
  });

  const handleHomepageClick = useCallback(() => {
    navigate(AppRoute.ROOT);

    if (orderId) {
      dispatch(orderActions.removeOrder(orderId));
    }
  }, [dispatch, navigate, orderId]);

  const handleCancelClick = useCallback(() => {
    if (orderId) {
      void dispatch(
        orderActions.changeAcceptOrderStatusByCustomer({
          orderId,
          newStatus: OrderStatusValue.REJECTED,
        }),
      );
    }
  }, [dispatch, orderId]);

  const handlePayClick = useCallback(() => {
    //TODO
  }, []);

  const isDriverShown =
    isConfirmScreenOpen || isPickingUpScreenOpen || isDoneScreenOpen;
  const isMapShown = !isCancelScreenOpen && !isDoneScreenOpen;

  const { firstName, lastName, licensePlate, price } = useGetOrderData(order);

  const { distanceLeft, timespanLeft, startLocation, endLocation } =
    useGetRouteData(order);
  const profileURL = null;

  const isOrderCardShown =
    !isCancelScreenOpen &&
    !isDoneScreenOpen &&
    startLocation &&
    endLocation &&
    price;

  if (dataStatus === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (dataStatus !== DataStatus.FULFILLED) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <OrderStatus
        className={getValidClassNames(
          styles.status,
          styles.statusTop,
          (isCancelScreenOpen || isDoneScreenOpen) && styles.statusBig,
        )}
      />
      {isMapShown && (
        <section className={styles.mapSection}>
          <div ref={mapReference} id="map" className={styles.map} />
        </section>
      )}
      <section className={styles.cardSection}>
        <OrderStatus
          className={getValidClassNames(styles.status, styles.statusBottom)}
        />
        {isOrderCardShown && (
          <OrderCard
            isDriverShown={isDriverShown}
            className={styles.card}
            cardData={{
              profileURL,
              firstName,
              lastName,
              licensePlate,
              startLocation,
              endLocation,
              distanceLeft,
              timespanLeft,
              price,
            }}
          />
        )}
        {status && (
          <ButtonsSection
            status={status}
            onCancelClick={handleCancelClick}
            onHomepageClick={handleHomepageClick}
            onPayClick={handlePayClick}
          />
        )}
      </section>
    </div>
  );
};

export { OrderStatusPage as OrderStatus };
