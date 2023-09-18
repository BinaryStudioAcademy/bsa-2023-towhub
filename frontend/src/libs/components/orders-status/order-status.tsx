import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { selectOrder } from '~/slices/orders/selectors.js';
import { selectTruckArrivalTime } from '~/slices/trucks/selectors.js';

import {
  OrderStatus as OrderStatusEnum,
  STATUS_MESSAGES,
} from './libs/enums/enums.js';
import { type OrderStatusValues } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const OrderStatus: React.FC<Properties> = ({ className }: Properties) => {
  const time = useAppSelector(selectTruckArrivalTime);
  const [order] = useAppSelector(selectOrder);
  const statusMessageMapper = (status: OrderStatusValues): string => {
    if (status === OrderStatusEnum.CONFIRMED) {
      return `${STATUS_MESSAGES[status]} ${time ? time.text : '...'}`;
    }

    return STATUS_MESSAGES[status];
  };

  const status = order.status;

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
