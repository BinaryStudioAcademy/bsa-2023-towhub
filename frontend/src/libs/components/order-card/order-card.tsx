import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { getValidClassNames, pluralizeString } from '~/libs/helpers/helpers.js';

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
};

const OrderCard: React.FC<Properties> = ({
  driver: { firstName, lastName, profileURL },
  truck: { licensePlate },
  initialStatus: { startLocation, endLocation },
  currentStatus: { timespanLastUpdated, location, distanceLeft, timespanLeft },
}: Properties) => {
  const pluralizedKilometers = pluralizeString('km', distanceLeft);

  return (
    <div className={styles.container}>
      <div className={styles.cardLayout}>
        <div className={styles.horizontalBar}>
          <div>
            <PlainSvgIcon name={PlainSvgIconName.HORIZONTAL_BAR} />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.headerImageContainer}>
            <img
              className={styles.profileImage}
              src={profileURL}
              alt="header"
            />
          </div>
          <div className={styles.headerInfoContainer}>
            <div className={styles.headerTitleContainer}>
              <span className="text-md">
                {firstName} {lastName}
              </span>
            </div>
            <div className={styles.headerSubtitleContainer}>
              <span className={getValidClassNames(styles.subtitle, 'text-sm')}>
                {licensePlate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyContent}>
            <div className={styles.locationDot}>
              <PlainSvgIcon name={PlainSvgIconName.LOCATION_DOT} />
            </div>
            <span className={getValidClassNames(styles.location, 'text-sm')}>
              {location}
            </span>
            <span className={getValidClassNames(styles.lastUpdate, 'text-sm')}>
              last updated {timespanLastUpdated} ago
            </span>
            <div
              className={getValidClassNames(
                styles.routeDot,
                styles.routeDotStart,
              )}
            >
              <PlainSvgIcon name={PlainSvgIconName.BLUE_CIRCLE} />
            </div>
            <span
              className={getValidClassNames(
                styles.routeInfo,
                styles.routeInfoStart,
                'text-sm',
              )}
            >
              {startLocation}
            </span>
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
            <span
              className={getValidClassNames(
                styles.routeInfo,
                styles.routeInfoEnd,
              )}
            >
              {endLocation}
            </span>
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
              {distanceLeft} {pluralizedKilometers}, {timespanLeft}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderCard };
