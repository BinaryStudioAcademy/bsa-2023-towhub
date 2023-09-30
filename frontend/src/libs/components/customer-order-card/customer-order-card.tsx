import money from '~/assets/img/money.svg';
import { Link } from '~/libs/components/link/link.jsx';
import { AppRoute, PlainSvgIconName } from '~/libs/enums/enums.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import {
  capitalizeFirstLetter,
  getPriceToString,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { Badge } from '../badge/badge.jsx';
import { Icon } from '../icon/icon.jsx';
import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.js';
import { Spinner } from '../spinner/spinner.js';
import { ProgressStatus } from './libs/enums/enums.js';
import { convertDate } from './libs/helpers/helpers.js';
import { mapOrderStatusToBadgeStatus } from './libs/map/map-order-status-to-badge-status.map.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
};

const CustomerOrderCard: React.FC<Properties> = ({ order }: Properties) => {
  const { id, scheduledTime, price, status, customerPhone, shift } = order;
  const { badgeBg, progress } = mapOrderStatusToBadgeStatus[status];
  const isInProcess = progress === ProgressStatus.IN_PROCESS;

  const points = useAppSelector((state) => state.orders.routeAddresses);

  const { origin, destination } = points[id] ?? {};

  if (!points[id]) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className={getValidClassNames(
        styles.container,
        isInProcess && styles.activeCard,
      )}
    >
      <div className={styles.header}>
        <div>Order {id}</div>
        {isInProcess && (
          <Link to={`${AppRoute.ORDER}/${id}`} className={styles.link}>
            Open to view order details
          </Link>
        )}
        <Badge
          className={getValidClassNames(styles.badge, styles[progress])}
          color={badgeBg}
        >
          {capitalizeFirstLetter(status)}
        </Badge>
      </div>
      <div className={styles.body}>
        <div className={styles.contentHeader}>
          <div className={styles.phoneWrapper}>
            <Icon iconName={IconName.MOBILE} />
            <div className={styles.phone}>{customerPhone}</div>
          </div>
          <div className={styles.licenseWrapper}>
            <Icon iconName={IconName.CAR} />
            <div className={styles.license}>
              {shift.truck?.licensePlateNumber}
            </div>
          </div>
        </div>
        <ul className={styles.locations}>
          <li className={getValidClassNames(styles.startPoint, 'textSm')}>
            {origin}
          </li>
          <li className={styles.arrowDown}>
            <PlainSvgIcon name={PlainSvgIconName.ARROW_DOWN} />
          </li>
          <li className={getValidClassNames(styles.endPoint, 'textSm')}>
            {destination}
          </li>
        </ul>
        <div className={styles.contentFooter}>
          <div className={styles.price}>
            <img src={money} alt="money" />
            {getPriceToString(price)}
          </div>
          <div className={styles.date}>{convertDate(scheduledTime)}</div>
        </div>
      </div>
    </div>
  );
};

export { CustomerOrderCard };
