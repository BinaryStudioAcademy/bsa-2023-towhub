import { IconName, ImgPath } from '~/libs/enums/enums.js';
import {
  getValidClassNames,
  jsonToLatLngLiteral,
} from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import { type OrderResponseDto } from '~/libs/types/types.js';

import { Badge, Icon } from '../components.js';
import { statusMapper } from './libs/mapper/status-mapper/status.mapper.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
  select: ({ startPoint, endPoint }: PlaceLatLng) => void;
};

const OrderListCardBusiness: React.FC<Properties> = ({
  order,
  select,
}: Properties) => {
  const {
    id,
    status,
    startPoint,
    endPoint,
    shift: { driver, truck },
  } = order;

  const selectCard = useCallback(
    (startPoint: string, endPoint: string) => () => {
      select({
        startPoint: jsonToLatLngLiteral(startPoint),
        endPoint: jsonToLatLngLiteral(endPoint),
      });
    },
    [select],
  );

  const statusBadge = statusMapper.get(status);

  return (
    <div
      className={styles.container}
      onMouseEnter={selectCard(startPoint, endPoint)}
    >
      <div className={styles.header}>
        <p className={getValidClassNames('textMdBold', styles.cardName)}>
          Order {id}
        </p>
        <Badge color={statusBadge?.color}>{statusBadge?.name ?? 'N/A'}</Badge>
      </div>
      <div className={styles.content}>
        <img
          src={ImgPath.AVAVTAR_DEFAULT}
          alt={driver.firstName}
          className={styles.avatar}
        />
        <div className={styles.driver}>
          <p className={getValidClassNames('textMdBold')}>
            {driver.firstName} {driver.lastName}
          </p>
          <p className={getValidClassNames('textMd', styles.driverPhone)}>
            {driver.phone}
          </p>
        </div>
        <div className={styles.truck}>
          <Icon iconName={IconName.TRUCK} className={styles.icon} />
          <p className={styles.truckNumber}>{truck.licensePlateNumber}</p>
        </div>
      </div>
    </div>
  );
};

export { OrderListCardBusiness };
