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
  const routeData = useAppSelector(selectOrderData);
  const startLocation = routeData.origin ?? '';
  const endLocation = routeData.destination ?? '';
  const distanceLeft = routeData.distanceAndDuration?.distance.text ?? '';
  const timespanLeft = routeData.distanceAndDuration?.duration.text ?? '';
  const licensePlate = order.shift.truck?.licensePlateNumber ?? '';
  const price = order.price;
  const firstName = order.shift.driver?.firstName ?? '';
  const lastName = order.shift.driver?.lastName ?? '';
  const profileURL =
    'https://images.freeimages.com/images/large-previews/962/avatar-man-with-mustages-1632966.jpg?fmt=webp&w=350';
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(
      orderActions.getRouteData({
        origin: order.startPoint,
        destination: order.endPoint,
      }),
    );
  }, [dispatch, order]);
  const CardHeader = (): JSX.Element => (
    <div className={styles.header}>
      <div className={styles.headerImageContainer}>
        <img className={styles.profileImage} src={profileURL} alt="header" />
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
