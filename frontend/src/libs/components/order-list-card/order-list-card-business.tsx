import { type OrderResponseDto } from 'shared/build/index.js';

import { IconName } from '~/libs/enums/icon-name.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { Badge, Icon } from '../components.js';
import { makeLatLngLiteral } from '../orders/libs/helpers/make-lat-lng-literal.helper.js';
import { statusConverter } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  order: OrderResponseDto;
  select: ({
    startPoint,
    endPoint,
  }: {
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }) => void;
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

  const statusBadge = statusConverter(status);

  const selectCard = useCallback(
    (startPoint: string, endPoint: string) => () => {
      select({
        startPoint: makeLatLngLiteral(startPoint),
        endPoint: makeLatLngLiteral(endPoint),
      });
    },
    [select],
  );

  return (
    <div
      className={styles.container}
      onMouseEnter={selectCard(startPoint, endPoint)}
    >
      <div className={styles.header}>
        <p className={getValidClassNames('textMdBold', styles.cardName)}>
          Order {id}
        </p>
        <Badge color={statusBadge.color}>{statusBadge.name}</Badge>
      </div>
      <div className={styles.content}>
        <img
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_03/3184101/phil-helsel-circle-byline-template.jpg"
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
