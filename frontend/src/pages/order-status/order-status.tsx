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
} from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/orders.js';
import { selectOrder } from '~/slices/orders/selectors.js';
import { selectTruckLocation } from '~/slices/trucks/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const OrderStatusPage: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = useAppSelector(selectOrder);
  const status = order?.status;
  const pendingScreen = status === OrderStatusEnum.PENDING;
  const cancelScreen = status === OrderStatusEnum.CANCELED;
  const confirmScreen = status === OrderStatusEnum.CONFIRMED;
  const onPointScreen = status === OrderStatusEnum.PICKING_UP;
  const doneScreen = status === OrderStatusEnum.DONE;
  const truckId = '1'; //Mock

  const truckLocation = useAppSelector(selectTruckLocation);

  useEffect(() => {
    if (orderId) {
      void dispatch(orderActions.getOrder(orderId));
      void dispatch(orderActions.listenOrderUpdates(orderId));
      void dispatch(truckActions.listenTruckUpdates(truckId));
    }
  }, [orderId, dispatch]);

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
    if (!cancelScreen && !doneScreen) {
      return (
        <OrderCard
          isDriverShown={confirmScreen || onPointScreen || doneScreen}
          className={styles.card}
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
      <OrderStatus
        className={getValidClassNames(styles.status, styles.statusTop)}
      />
      {!cancelScreen && !doneScreen && (
        <section className={styles.mapSection}>
          <Map
            center={
              truckLocation ?? {
                lat: 0,
                lng: 0,
              }
            }
            zoom={13}
            className={styles.map}
          />
        </section>
      )}
      <section className={styles.cardSection}>
        <OrderStatus
          className={getValidClassNames(styles.status, styles.statusBottom)}
        />
        <Card />
        <ButtonsSection />
      </section>
    </div>
  );
};

export { OrderStatusPage as OrderStatus };
