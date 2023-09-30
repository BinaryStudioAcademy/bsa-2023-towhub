import { PlainSvgIconName } from '~/libs/enums/enums.js';
import {
  getPriceToString,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';

import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.js';
import { CardHeader } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
  isDriverShown?: boolean;
  cardData: {
    profileURL: string | null;
    firstName: string;
    lastName: string;
    licensePlate: string;
    startLocation: string;
    endLocation: string;
    distanceLeft: string;
    timespanLeft: string;
    price: number;
  };
};

const OrderCard: React.FC<Properties> = ({
  className,
  isDriverShown = true,
  cardData,
}: Properties) => {
  const {
    profileURL,
    firstName,
    lastName,
    licensePlate,
    startLocation,
    endLocation,
    distanceLeft,
    timespanLeft,
    price,
  } = cardData;

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
            <span className={styles.price}>
              Total price: {getPriceToString(price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderCard };
