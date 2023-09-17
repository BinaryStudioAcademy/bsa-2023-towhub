import { Button, OrderCard } from '~/libs/components/components.js';
import { Map } from '~/libs/components/map/map.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/orders.js';
import { selectOrder, selectOrderData } from '~/slices/orders/selectors.js';
import {
  selectTruckArrivalTime,
  selectTruckLocation,
} from '~/slices/trucks/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const order = useAppSelector(selectOrder);
  const status = order?.status;
  const pendingScreen = status === OrderStatusEnum.PENDING;
  const cancelScreen = status === OrderStatusEnum.CANCELED;
  const confirmScreen = status === OrderStatusEnum.CONFIRMED;
  const onPointScreen = status === OrderStatusEnum.PICKING_UP;
  const doneScreen = status === OrderStatusEnum.DONE;
  const truckId = '1'; //Mock
  const routeData = useAppSelector(selectOrderData);
  const truckLocation = useAppSelector(selectTruckLocation);
  const truckArrivalTime = useAppSelector(selectTruckArrivalTime);

  useEffect(() => {
    if (truckLocation) {
      //Mock
      setLocation(truckLocation);
    }
  }, [truckLocation, setLocation]);

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.getOrder(orderId));
      void dispatch(orderActions.listenOrderUpdates(orderId));
      void dispatch(truckActions.listenTruckUpdates(truckId));
    }
  }, [orderId, dispatch]);

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

  const handleHomepageClick = useCallback(() => {
    navigate(AppRoute.ROOT);
  }, [navigate]);

  const handleCancelClick = useCallback(() => {
    //TODO
  }, []);
  const handlePayClick = useCallback(() => {
    //TODO
  }, []);

  const Card = (): JSX.Element | null => {
    if (order && !cancelScreen && !doneScreen) {
      return (
        <OrderCard
          isDriverShown={confirmScreen || onPointScreen || doneScreen}
          className={styles.card}
          driver={{
            firstName: order.shift.driver?.firstName ?? '',
            lastName: order.shift.driver?.lastName ?? '',
            profileURL:
              'https://images.freeimages.com/images/large-previews/962/avatar-man-with-mustages-1632966.jpg?fmt=webp&w=350',
          }}
          truck={{ licensePlate: order.shift.truck?.licensePlateNumber ?? '' }}
          initialStatus={{
            startLocation: routeData.origin ?? '',
            endLocation: routeData.destination ?? '',
          }}
          currentStatus={{
            distanceLeft: routeData.distanceAndDuration?.distance.text ?? '',
            timespanLeft: routeData.distanceAndDuration?.duration.text ?? '',
          }}
          price={order.price}
        />
      );
    }

    return null;
  };

  const isDeclineButtonShown = pendingScreen || confirmScreen;
  const isPayNowButtonShown = onPointScreen;
  const isHomepageButtonShown = cancelScreen || doneScreen;
  const ButtonsSection = (): JSX.Element => (
    <section className={styles.buttonsSection}>
      {isDeclineButtonShown && (
        <Button
          label="DECLINE"
          className={styles.buttonDecline}
          size={'md'}
          onClick={handleCancelClick}
        />
      )}
      {isPayNowButtonShown && (
        <Button
          label="PAY NOW"
          className={styles.buttonPayNow}
          size={'md'}
          onClick={handlePayClick}
        />
      )}
      {isHomepageButtonShown && (
        <Button
          label="HOMEPAGE"
          className={styles.buttonHomepage}
          size={'md'}
          onClick={handleHomepageClick}
        />
      )}
    </section>
  );

  return (
    <div className={styles.container}>
      {order && (
        <>
          <OrderStatus
            status={order.status}
            time={truckArrivalTime ? truckArrivalTime.text : '...'}
            className={getValidClassNames(styles.status, styles.statusTop)}
          />
          {!cancelScreen && !doneScreen && (
            <section className={styles.mapSection}>
              <Map center={location} zoom={13} className={styles.map} />
            </section>
          )}
          <section className={styles.cardSection}>
            <OrderStatus
              status={order.status}
              className={getValidClassNames(styles.status, styles.statusBottom)}
              time={truckArrivalTime ? truckArrivalTime.text : '...'}
            />
            <Card />
            <ButtonsSection />
          </section>
        </>
      )}
    </div>
  );
};

export { OrderPage as Order };
