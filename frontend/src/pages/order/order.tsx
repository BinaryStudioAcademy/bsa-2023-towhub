import { OrderStatus as OrderStatusEnum } from 'shared/build/packages/orders/libs/enums/order-status.enum';

import {
  // BusinessCard,
  // CustomerCard,
  OrderCard,
} from '~/libs/components/components.js';
import { OrderStatus } from '~/libs/components/orders-status/order-status.js';

// import { AppRoute } from '~/libs/enums/enums.js';
// import { getValidClassNames } from '~/libs/helpers/helpers.js';
// import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import styles from './styles.module.scss';

const OrderPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <OrderStatus status={OrderStatusEnum.PENDING} className={styles.status} />
      <OrderCard
        driver={{
          firstName: 'First Name',
          lastName: 'Last Name',
          profileURL: `https://www.gravatar.com/avatar/${Math.random()}`,
        }}
        truck={{ licensePlate: '1111' }}
        initialStatus={{ startLocation: 'London', endLocation: 'Paris' }}
        currentStatus={{
          timespanLastUpdated: '30 seconds ago',
          location: 'A',
          distanceLeft: 12,
          timespanLeft: '1 hrs 24 mins',
        }}
        className={styles.card}
      />
    </div>
  );
};

export { OrderPage as Order };
