import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.jsx';
import style from './styles.module.scss';

type Properties = {
  driver: {
    firstName: string;
    lastName: string;
    profileURL: string;
  };
  truck: {
    licensePlate: string;
  };
  initialStatus: {
    startLocation: string;
    endLocation: string;
  };
  currentStatus: {
    timespanLastUpdated: string;
    location: string;
    distanceLeft: number;
    timespanLeft: string;
  };
};

const Card: React.FC<Properties> = ({
  driver: { firstName, lastName, profileURL },
  truck: { licensePlate },
  initialStatus: { startLocation, endLocation },
  currentStatus: { timespanLastUpdated, location, distanceLeft, timespanLeft },
}: Properties) => (
  <div className={style.container}>
    <div className={style.cardLayout}>
      <div className={style.horizontalBar}>
        <div>
          <PlainSvgIcon name={PlainSvgIconName.HORIZONTAL_BAR} />
        </div>
      </div>
      <div className={style.header}>
        <div className={style.headerImageContainer}>
          <img className={style.profileImage} src={profileURL} alt="header" />
        </div>
        <div className={style.headerInfoContainer}>
          <div className={style.headerTitleContainer}>
            <span className='text-md'>
              {firstName} {lastName}
            </span>
          </div>
          <div className={style.headerSubtitleContainer}>
            <span className={getValidClassNames(style.subtitle, 'text-sm')}>
              {licensePlate}
            </span>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.locationContainer}>
          <div className={style.locationDot}>
            <PlainSvgIcon name={PlainSvgIconName.LOCATION_DOT} />
          </div>
          <span className={getValidClassNames(style.location, 'text-sm')}>
            {location}
          </span>
          <span className={getValidClassNames(style.lastUpdate, 'text-sm')}>
            last updated {timespanLastUpdated} ago
          </span>
        </div>
        <div className={style.routesContainer}>
          <div className={style.routePoint}>
            <div className={style.routeDot}>
              <PlainSvgIcon name={PlainSvgIconName.BLUE_CIRCLE} />
            </div>
            <span className={getValidClassNames(style.routeInfo, 'text-sm')}>
              {startLocation}
            </span>
          </div>
          <div className={style.routePoint}>
            <div className={style.routeArrow}>
              <PlainSvgIcon name={PlainSvgIconName.ARROW_DOWN} />
            </div>
          </div>
          <div className={style.routePoint}>
            <div className={style.routeDot}>
              <PlainSvgIcon name={PlainSvgIconName.RED_CIRCLE} />
            </div>
            <span className={style.routeInfo}>{endLocation}</span>
          </div>
        </div>
        <div className={style.distanceContainer}>
          <div className={style.distanceIcon}>
            <PlainSvgIcon name={PlainSvgIconName.MAP} />
          </div>
          <span className={getValidClassNames(style.distanceInfo, 'text-md')}>
            {distanceLeft} km{distanceLeft > 1 && 's'}, {timespanLeft}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export { Card };
