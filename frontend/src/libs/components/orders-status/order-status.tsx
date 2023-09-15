import { getValidClassNames } from '~/libs/helpers/helpers.js';

import {
  OrderStatus as OrderStatusEnum,
  STATUS_MESSAGES,
} from './libs/enums/enums.js';
import { type OrderStatusValues } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  status: OrderStatusValues;
  className?: string;
  time: number;
};

const OrderStatus: React.FC<Properties> = ({
  status,
  className,
  time,
}: Properties) => {
  const statusMessageMapper = (status: OrderStatusValues): string => {
    if (status === OrderStatusEnum.CONFIRMED) {
      return `${STATUS_MESSAGES[status]} ${time} minutes`;
    }

    return STATUS_MESSAGES[status];
  };

  return (
    <div
      className={getValidClassNames(
        styles.container,
        className,
        styles[status],
      )}
    >
      <div className={styles.square}></div>
      <span className={styles.text}>{statusMessageMapper(status)}</span>
    </div>
  );
};

export { OrderStatus };
