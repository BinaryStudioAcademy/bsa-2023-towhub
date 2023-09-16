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
import { actions } from '~/slices/orders/orders.js';
import { selectOrder, selectPointsNames } from '~/slices/orders/selectors.js';

import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>();
  const [destination] = useState<google.maps.LatLngLiteral>();
  const order = useAppSelector(selectOrder);
  const status = order?.status;
  const pendingScreen = status === OrderStatusEnum.PENDING;
  const cancelScreen = status === OrderStatusEnum.CANCELED;
  const confirmScreen = status === OrderStatusEnum.CONFIRMED;
  const onPointScreen = status === OrderStatusEnum.PICKING_UP;
  const doneScreen = status === OrderStatusEnum.DONE;
  const truckArrivalTime = 10;
  const pointsNames = useAppSelector(selectPointsNames);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
    });
  }, [setLocation, dispatch]);

  useEffect(() => {
    if (orderId) {
      void dispatch(actions.getOrder(orderId));
      void dispatch(actions.listenOrderUpdates(orderId));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (order) {
      void dispatch(
        actions.getPointsNames({
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
    //
  }, []);
  const handlePayClick = useCallback(() => {
    //
  }, []);

  const Card = (): JSX.Element | null => {
    if (order && !cancelScreen && !doneScreen) {
      return (
        <OrderCard
          isDriverShown={confirmScreen || onPointScreen || doneScreen}
          className={styles.card}
          driver={{
            firstName: order.driver.firstName,
            lastName: order.driver.lastName,
            profileURL: 'https://i.pravatar.cc/300',
          }}
          truck={{ licensePlate: 'GB 555' }}
          initialStatus={{
            startLocation: pointsNames.origin ?? '',
            endLocation: pointsNames.destination ?? '',
          }}
          currentStatus={{
            distanceLeft: 12,
            timespanLeft: '1 hrs 24 mins',
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
            time={truckArrivalTime}
            className={getValidClassNames(styles.status, styles.statusTop)}
          />
          {!cancelScreen && !doneScreen && (
            <section className={styles.mapSection}>
              {location && (
                <Map
                  center={location}
                  zoom={16}
                  destination={destination}
                  className={styles.map}
                />
              )}
            </section>
          )}
          <section className={styles.cardSection}>
            <OrderStatus
              status={order.status}
              className={getValidClassNames(styles.status, styles.statusBottom)}
              time={truckArrivalTime}
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
