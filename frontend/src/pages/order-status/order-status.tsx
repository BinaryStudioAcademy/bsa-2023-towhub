import { OrderCard, Spinner } from '~/libs/components/components.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useBlocker,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useRef,
} from '~/libs/hooks/hooks.js';
import { jsonToLatLngLiteral } from '~/slices/orders/libs/helpers/json-to-lat-lng-literal.helper.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectDataStatus, selectOrder } from '~/slices/orders/selectors.js';
import {
  selectChosenTruck,
  selectTruckLocation,
} from '~/slices/trucks/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { NotFound } from '../pages.js';
import { ButtonsSection } from './libs/components/components.js';
import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = useAppSelector(selectOrder);
  const dataStatus = useAppSelector(selectDataStatus);

  const status = order?.status;
  const isPendingScreenOpen = status === OrderStatusEnum.PENDING;
  const isCancelScreenOpen = status === OrderStatusEnum.CANCELED;
  const isConfirmScreenOpen = status === OrderStatusEnum.CONFIRMED;
  const isPickingUpScreenOpen = status === OrderStatusEnum.PICKING_UP;
  const isDoneScreenOpen = status === OrderStatusEnum.DONE;

  const truckId =
    useAppSelector(selectChosenTruck)?.id ?? order?.shift.truck?.id;

  useBlocker(
    useCallback(() => {
      if (truckId) {
        void dispatch(truckActions.unsubscribeTruckUpdates(truckId));
      }

      if (orderId) {
        void dispatch(orderActions.unsubscribeOrderUpdates(orderId));
      }

      return false;
    }, [dispatch, orderId, truckId]),
  );

  const truckLocation = useAppSelector(selectTruckLocation);

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.getOrder(orderId));
      void dispatch(orderActions.subscribeOrderUpdates(orderId));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (truckId) {
      void dispatch(truckActions.subscribeTruckUpdates(truckId));
    }
  }, [truckId, dispatch]);

  const handleHomepageClick = useCallback(() => {
    navigate(AppRoute.ROOT);
  }, [navigate]);

  const handleCancelClick = useCallback(() => {
    //TODO
  }, []);
  const handlePayClick = useCallback(() => {
    //TODO
  }, []);

  const mapReference = useRef<HTMLDivElement>(null);

  useAppMap({
    center: truckLocation,
    destination: order ? jsonToLatLngLiteral(order.startPoint) : null,
    className: styles.map,
    mapReference: mapReference,
  });

  const MapElement = useCallback(
    () => <div ref={mapReference} id="map" className={styles.map} />,
    [],
  );

  const isDeclineButtonShown = isPendingScreenOpen || isConfirmScreenOpen;
  const isPayNowButtonShown = isPickingUpScreenOpen;
  const isHomepageButtonShown = isCancelScreenOpen || isDoneScreenOpen;
  const isDriverShown =
    isConfirmScreenOpen || isPickingUpScreenOpen || isDoneScreenOpen;
  const isOrderCardShown = !isCancelScreenOpen && !isDoneScreenOpen;
  const isMapShown = !isCancelScreenOpen && !isDoneScreenOpen;

  if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
    return <Spinner />;
  }

  if (dataStatus === DataStatus.REJECTED) {
    return <NotFound />;
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
          <MapElement />
        </section>
      )}
      <section className={styles.cardSection}>
        <OrderStatus
          className={getValidClassNames(styles.status, styles.statusBottom)}
        />
        {isOrderCardShown && (
          <OrderCard isDriverShown={isDriverShown} className={styles.card} />
        )}
        <ButtonsSection
          isDeclineButtonShown={isDeclineButtonShown}
          isPayNowButtonShown={isPayNowButtonShown}
          isHomepageButtonShown={isHomepageButtonShown}
          onCancelClick={handleCancelClick}
          onHomepageClick={handleHomepageClick}
          onPayClick={handlePayClick}
        />
      </section>
    </div>
  );
};

export { OrderStatusPage as OrderStatus };
