import { IconName, ImgPath } from '~/libs/enums/enums.js';
import {
  getValidClassNames,
  jsonToLatLngLiteral,
} from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import { type OrderResponseDto } from '~/libs/types/types.js';

import { Badge, Icon } from '../components.js';
import { getFullName } from '../header/libs/helpers/helpers.js';
import { mapOrderStatusToReadable } from './libs/map/maps.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
  onSelect: ({ startPoint, endPoint }: PlaceLatLng) => void;
};

const OrderListCardBusiness: React.FC<Properties> = ({
  order,
  onSelect,
}: Properties) => {
  const {
    id,
    status,
    startPoint,
    endPoint,
    shift: { driver, truck },
  } = order;

  const handleSelectCard = useCallback(
    (startPoint: string, endPoint: string) => () => {
      onSelect({
        startPoint: jsonToLatLngLiteral(startPoint),
        endPoint: jsonToLatLngLiteral(endPoint),
      });
    },
    [onSelect],
  );

  const statusBadge = mapOrderStatusToReadable[status];

  return (
    <div
      className={styles.container}
      onMouseEnter={handleSelectCard(startPoint, endPoint)}
    >
      <div className={styles.header}>
        <p className={getValidClassNames('textMdBold', styles.cardName)}>
          Order {id}
        </p>
        <Badge color={statusBadge.color}>{statusBadge.name}</Badge>
      </div>
      <div className={styles.content}>
        <img
          src={ImgPath.AVATAR_DEFAULT}
          alt={driver?.firstName}
          className={styles.avatar}
        />
        <div className={styles.driver}>
          <p className={getValidClassNames('textMdBold')}>
            {driver && getFullName(driver.firstName, driver.lastName)}
          </p>
        </div>
        <div className={styles.contacts}>
          <div className={styles.contactsItem}>
            <Icon iconName={IconName.MOBILE} className={styles.icon} />
            <p className={getValidClassNames('textMd', styles.driverPhone)}>
              {driver?.phone}
            </p>
          </div>
          <div className={styles.contactsItem}>
            <Icon iconName={IconName.CAR} className={styles.icon} />
            <p className={getValidClassNames('textMd', styles.truckNumber)}>
              {truck?.licensePlateNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderListCardBusiness };
