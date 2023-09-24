import money from '~/assets/img/money.svg';
import { Link } from '~/libs/components/link/link.jsx';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import {
  capitalizeFirstLetter,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { Badge } from '../badge/badge.jsx';
import { Icon } from '../icon/icon.jsx';
import { ProgressStatus } from './libs/enums/enums.js';
import { convertDate, getBadgeColorByStatus } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
};

const CustomerOrderCard: React.FC<Properties> = ({ order }: Properties) => {
  const {
    id,
    scheduledTime,
    startPoint,
    endPoint,
    price,
    status,
    customerPhone,
    shift,
  } = order;
  const { badgeBg, progress } = getBadgeColorByStatus(status);
  const isInProcess = progress === ProgressStatus.IN_PROCESS;

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
          <Link to={'/'} className={styles.link}>
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
            {startPoint}
          </li>
          <li className={getValidClassNames(styles.endPoint, 'textSm')}>
            {endPoint}
          </li>
        </ul>
        <div className={styles.contentFooter}>
          <div className={styles.price}>
            <img src={money} alt="money" />
            {price} $
          </div>
          <div className={styles.date}>{convertDate(scheduledTime)}</div>
        </div>
      </div>
    </div>
  );
};

export { CustomerOrderCard };
