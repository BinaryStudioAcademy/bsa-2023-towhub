import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { type OrderStatusValues } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  status: OrderStatusValues;
  className?: string;
};

const OrderStatus: React.FC<Properties> = ({
  status,
  className,
}: Properties) => {
  return (
    <div
      className={getValidClassNames(
        styles.container,
        Boolean(className) && className,
      )}
    >
      <div className={styles.circle}></div>
      <span className={getValidClassNames(styles.text, 'textMdBold')}>
        {status}
      </span>
    </div>
  );
};

export { OrderStatus };
