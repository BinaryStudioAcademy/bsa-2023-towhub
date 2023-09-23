import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectOrder, selectOrderData } from '~/slices/orders/selectors.js';

import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.js';
import { CardHeader } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
  isDriverShown?: boolean;
};

const OrderCard: React.FC<Properties> = ({
  className,
  isDriverShown = true,
}: Properties) => {
  const order = useAppSelector(selectOrder);
  const {
    origin: startLocation = '',
    destination: endLocation = '',
    distanceAndDuration,
  } = useAppSelector(selectOrderData);

  const { distance, duration } = distanceAndDuration ?? {};
  const { text: distanceLeft = '' } = distance ?? {};
  const { text: timespanLeft = '' } = duration ?? {};
  const { shift, price } = order ?? {};
  const { truck, driver } = shift ?? {};
  const { licensePlateNumber: licensePlate = '' } = truck ?? {};
  const { firstName: firstName = '', lastName: lastName = '' } = driver ?? {};

  const profileURL = null;
  const dispatch = useAppDispatch();

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

  return (
    <div className={getValidClassNames(styles.container, className)}>
      <div className={styles.cardLayout}>
        <div className={styles.horizontalBar}>
          <div>
            <PlainSvgIcon name={PlainSvgIconName.HORIZONTAL_BAR} />
          </div>
        </div>
        {isDriverShown && (
          <CardHeader
            profileURL={profileURL}
            firstName={firstName}
            lastName={lastName}
            licensePlate={licensePlate}
          />
        )}
        <div className={styles.body}>
          <div className={styles.bodyContent}>
            <div
              className={getValidClassNames(
                styles.routeDot,
                styles.routeDotStart,
              )}
            >
              <PlainSvgIcon name={PlainSvgIconName.BLUE_CIRCLE} />
            </div>
            <div className={styles.routeInfoStart}>
              <div className={styles.routeInfo}>
                {startLocation}
                <span className={styles.tooltipTextStart}>{startLocation}</span>
              </div>
            </div>
            <div className={styles.routeArrow}>
              <PlainSvgIcon name={PlainSvgIconName.ARROW_DOWN} />
            </div>
            <div
              className={getValidClassNames(
                styles.routeDot,
                styles.routeDotEnd,
              )}
            >
              <PlainSvgIcon name={PlainSvgIconName.RED_CIRCLE} />
            </div>
            <div className={styles.routeInfoEnd}>
              <div className={styles.routeInfo}>
                {endLocation}
                <span className={styles.tooltipTextEnd}>{endLocation}</span>
              </div>
            </div>
            <div className={styles.distanceIcon}>
              <PlainSvgIcon name={PlainSvgIconName.MAP} />
            </div>
            <span
              className={getValidClassNames(
                styles.distanceInfo,
                styles.distanceInfoEnd,
                'text-md',
              )}
            >
              {distanceLeft}, {timespanLeft}
            </span>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>Total price: {price}$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderCard };
