import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { selectOrder } from '~/slices/orders/selectors.js';
import { selectTruckArrivalTime } from '~/slices/trucks/selectors.js';

import { Spinner } from '../components.js';
import { OrderStatus as OrderStatusEnum } from './libs/enums/enums.js';
import { orderStatusToMessage } from './libs/maps/order-status-to-message.map.js';
import { type OrderStatusValues } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const OrderStatus: React.FC<Properties> = ({ className }: Properties) => {
  const arrivalTime = useAppSelector(selectTruckArrivalTime);
  const [order] = useAppSelector(selectOrder);
  const getStatusMessageMapper = (status: OrderStatusValues): string => {
    if (status === OrderStatusEnum.CONFIRMED) {
      return `${orderStatusToMessage[status]} ${
        arrivalTime ? arrivalTime.text : '...'
      }`;
    }

    return orderStatusToMessage[status];
  };

  const status = order?.status;

  if (!status) {
    return <Spinner />;
  }

  return (
    <div
      className={getValidClassNames(
        styles.container,
        className,
        styles[status],
      )}
    >
      <div className={styles.square}></div>
      <span className={styles.text}>{getStatusMessageMapper(status)}</span>
    </div>
  );
};

export { OrderStatus };
