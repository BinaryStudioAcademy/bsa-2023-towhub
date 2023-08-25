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
    <div className={style.card_layout}>
      <div className={style.horizontal_bar}>
        <div>
          <PlainSvgIcon name={PlainSvgIconName.HORIZONTAL_BAR} />
        </div>
      </div>
      <div className={style.header}>
        <div className={style.header_image_container}>
          <img className={style.profileImage} src={profileURL} alt="header" />
        </div>
        <div className={style.header_info_container}>
          <div className={style.header_title_container}>
            <span className={getValidClassNames('text-md')}>
              {firstName} {lastName}
            </span>
          </div>
          <div className={style.header_subtitle_container}>
            <span className={getValidClassNames(style.subtitle, 'text-sm')}>
              {licensePlate}
            </span>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.location_container}>
          <div className={style.location_dot}>
            <PlainSvgIcon name={PlainSvgIconName.LOCATION_DOT} />
          </div>
          <span className={getValidClassNames(style.location, 'text-sm')}>
            {location}
          </span>
          <span className={getValidClassNames(style.last_update, 'text-sm')}>
            last updated {timespanLastUpdated} ago
          </span>
        </div>
        <div className={style.routes_container}>
          <div className={style.route_point}>
            <div className={style.route_dot}>
              <PlainSvgIcon name={PlainSvgIconName.BLUE_CIRCLE} />
            </div>
            <span className={getValidClassNames(style.route_info, 'text-sm')}>
              {startLocation}
            </span>
          </div>
          <div className={style.route_point}>
            <div className={style.route_arrow}>
              <PlainSvgIcon name={PlainSvgIconName.ARROW_DOWN} />
            </div>
          </div>
          <div className={style.route_point}>
            <div className={style.route_dot}>
              <PlainSvgIcon name={PlainSvgIconName.RED_CIRCLE} />
            </div>
            <span className={style.route_info}>{endLocation}</span>
          </div>
        </div>
        <div className={style.distance_container}>
          <div className={style.distance_icon}>
            <PlainSvgIcon name={PlainSvgIconName.MAP} />
          </div>
          <span className={getValidClassNames(style.distance_info, 'text-md')}>
            {distanceLeft} km{distanceLeft > 1 && 's'}, {timespanLeft}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export { Card };
