import money from '~/assets/img/money.svg';
import {
  capitalizeFirstLetter,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { Badge } from '../badge/badge.jsx';
import { convertDate, getBadgeColorByStatus } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
};

const CustomerOrderCard: React.FC<Properties> = ({ order }: Properties) => {
  const { id, scheduledTime, startPoint, endPoint, price, status } = order;
  const badgeColor = getBadgeColorByStatus(status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Order {id}</div>
        <Badge
          className={getValidClassNames(styles.badge, styles[status])}
          color={badgeColor}
        >
          {capitalizeFirstLetter(status)}
        </Badge>
      </div>
      <div className={styles.body}>
        <div className={styles.date}>{convertDate(scheduledTime)}</div>
        <ul className={styles.locations}>
          <li className={getValidClassNames(styles.startPoint, 'textSm')}>
            {startPoint}
          </li>
          <li className={getValidClassNames(styles.endPoint, 'textSm')}>
            {endPoint}
          </li>
        </ul>
        <div className={styles.price}>
          <img src={money} alt="money" />
          {price} $
        </div>
      </div>
    </div>
  );
};

export { CustomerOrderCard };
