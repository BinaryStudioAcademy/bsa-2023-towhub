import { type OrderResponseDto } from 'shared/build/index.js';

import { IconName } from '~/libs/enums/icon-name.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Badge, Icon } from '../components.js';
import { statusConverter } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
};

const OrderListCardBusiness: React.FC<Properties> = ({ order }: Properties) => {
  // const { id, status, driver, truck } = order;
  const status = statusConverter(order.status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={getValidClassNames('textMdBold', styles.cardName)}>
          Order {order.id}
        </p>
        <Badge color={status.color}>{status.name}</Badge>
      </div>
      <div className={styles.content}>
        <img
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_03/3184101/phil-helsel-circle-byline-template.jpg"
          alt={order.shift.driver.firstName}
          className={styles.avatar}
        />
        <div className={styles.driver}>
          <p className={getValidClassNames('textMdBold')}>
            {order.shift.driver.firstName} {order.shift.driver.lastName}
          </p>
          <p className={getValidClassNames('textMd', styles.driverPhone)}>
            {order.shift.driver.phone}
          </p>
        </div>
        <div className={styles.truck}>
          <Icon iconName={IconName.TRUCK} className={styles.icon} />
          <p className={styles.truckNumber}>
            {order.shift.truck.licensePlateNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export { OrderListCardBusiness };
