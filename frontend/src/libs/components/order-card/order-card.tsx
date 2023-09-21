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
import styles from './styles.module.scss';

type Properties = {
  className?: string;
  isDriverShown?: boolean;
};

const OrderCard: React.FC<Properties> = ({
  className,
  isDriverShown = true,
}: Properties) => {
  const [order] = useAppSelector(selectOrder);
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
  const CardHeader = (): JSX.Element => (
    <div className={styles.header}>
      <div className={styles.headerImageContainer}>
        {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          profileURL ? (
            <img
              className={styles.profileImage}
              src={profileURL}
              alt="header"
            />
          ) : (
            <div className={styles.noAvatar}></div>
          )
        }
      </div>
      <div className={styles.headerInfoContainer}>
        <div className={styles.headerTitleContainer}>
          <span className="textMd">
            {firstName} {lastName}
          </span>
        </div>
        <div className={styles.headerSubtitleContainer}>
          <span className={getValidClassNames(styles.subtitle, 'textSm')}>
            {licensePlate}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={getValidClassNames(styles.container, className)}>
      <div className={styles.cardLayout}>
        <div className={styles.horizontalBar}>
          <div>
            <PlainSvgIcon name={PlainSvgIconName.HORIZONTAL_BAR} />
          </div>
        </div>
        {isDriverShown && <CardHeader />}
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
            <div
              className={getValidClassNames(
                styles.routeInfoStart,
                styles.routeInfo,
              )}
            >
              <span
                className={getValidClassNames('text-sm', styles.routeInfoInner)}
              >
                {startLocation}
              </span>
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
            <div
              className={getValidClassNames(
                styles.routeInfoEnd,
                styles.routeInfo,
              )}
            >
              <span
                className={getValidClassNames('text-sm', styles.routeInfoInner)}
              >
                {endLocation}
              </span>
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
