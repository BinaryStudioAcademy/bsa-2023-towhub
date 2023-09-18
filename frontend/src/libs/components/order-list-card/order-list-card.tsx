// import { PlainSvgIconName } from '~/libs/enums/enums.js';
// import { getValidClassNames } from '~/libs/helpers/helpers.js';

// import { PlainSvgIcon } from '../plain-svg-icon/plain-svg-icon.js';
import { type OrderResponseDto } from 'shared/build/index.js';

import styles from './styles.module.scss';
// import { Badge } from '../components.js';

type Properties = {
  order: OrderResponseDto;
};

const OrderListCard: React.FC<Properties> = ({ order }: Properties) => {
  // const { id, status, driver, truck } = order;

  return <div className={styles.container}>{order.id}</div>;
};

export { OrderListCard };

// {/* <div className={styles.cardLayout}>
//   <div className={styles.header}>
//     <div className={styles.cardName}>Order {id}</div>
//     <Badge>{status}</Badge>
//   </div>
//   <div className={styles.cardContent}>
//     <div className={styles.driver}>
//       <div className={styles.phoneIcon}>
//         {/* <PlainSvgIcon name={PlainSvgIconName.LOCATION_DOT} /> */}
//       </div>
//       <span className={getValidClassNames(styles.location, 'text-sm')}>
//         {driver.phone}
//       </span>
//     </div>
//     <div className={styles.truck}>
//       <div className={styles.locationDot}>
//         <PlainSvgIcon name={PlainSvgIconName.LOCATION_DOT} />
//       </div>
//       <div className={styles.locationDot}>
//         <span className={styles.truckType} />
//         <span className={styles.truckNumber} />
//       </div>
//     </div>
//   </div>
// </div>; */}
