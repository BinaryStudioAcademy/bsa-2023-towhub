import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.js';
import {
  type DriverProfileInfo,
  type OrderCurrentStatus,
  type OrderedTruckInfo,
  type OrderInitialStatus,
} from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  driver: DriverProfileInfo;
  truck: OrderedTruckInfo;
  initialStatus: OrderInitialStatus;
  currentStatus: OrderCurrentStatus;
  className?: string;
  isDriverShown?: boolean;
  price: number;
};

const OrderCard: React.FC<Properties> = ({
  driver: { firstName, lastName, profileURL },
  truck: { licensePlate },
  initialStatus: { startLocation, endLocation },
  currentStatus: { distanceLeft, timespanLeft },
  className,
  isDriverShown = true,
  price,
}: Properties) => {
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
