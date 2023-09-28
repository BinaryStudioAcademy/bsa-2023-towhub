import { Link } from 'react-router-dom';

import money from '~/assets/img/order-card/money.svg';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import { PlainSvgIconName } from '~/libs/enums/plain-svg-icon-name.enum.js';
import {
  capitalizeFirstLetter,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';
import { selectRouteAddresses } from '~/slices/orders/selectors.js';

import { Badge } from '../badge/badge.js';
import { PlainSvgIcon, Spinner } from '../components.js';
import { Icon } from '../icon/icon.js';
import { OrderStatus } from './libs/enums/enums.js';
import { convertDate } from './libs/helpers/helpers.js';
import { statusToBadgeColorMap } from './libs/maps/maps.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
};

const DriverOrderCard: React.FC<Properties> = ({ order }: Properties) => {
  const { id, scheduledTime, price, status, customerPhone, shift } = order;
  const badgeBg = statusToBadgeColorMap[status];
  const isActive = status === OrderStatus.PENDING;

  const points = useAppSelector(selectRouteAddresses);

  const { origin, destination } = points[id] ?? {};

  if (!points[id]) {
    return <Spinner />;
  }

  return (
    <div
      className={getValidClassNames(
        styles.container,
        isActive && styles.activeCard,
      )}
    >
      <div className={styles.header}>
        <div>Order {id}</div>
        {isActive && (
          <Link to={`${AppRoute.ORDER}/${id}`} className={styles.link}>
            Open to view order details
          </Link>
        )}
        <Badge className={styles.badge} color={badgeBg}>
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
        <div className={styles.locations}>
          <div className={styles.pointsWrapper}>
            <PlainSvgIcon name={PlainSvgIconName.BLUE_CIRCLE} />
            <div className={getValidClassNames(styles.startPoint, 'textSm')}>
              {origin}
            </div>
          </div>
          <div className={styles.arrowDown}>
            <PlainSvgIcon name={PlainSvgIconName.ARROW_DOWN} />
          </div>
          <div className={styles.pointsWrapper}>
            <PlainSvgIcon name={PlainSvgIconName.RED_CIRCLE} />
            <div className={getValidClassNames(styles.endPoint, 'textSm')}>
              {destination}
            </div>
          </div>
        </div>
        <div className={styles.contentFooter}>
          <div className={styles.price}>
            <img src={money} alt="money" />
            <span>{price}$</span>
          </div>
          <div className={styles.date}>{convertDate(scheduledTime)}</div>
        </div>
      </div>
    </div>
  );
};

export { DriverOrderCard };
