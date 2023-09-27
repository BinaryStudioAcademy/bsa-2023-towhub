import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { manufacturerKeyToReadableName } from '~/packages/trucks/libs/maps/maps.js';
import { type TruckWithDistance } from '~/pages/homepage/libs/types/types.js';

import { Badge } from '../badge/badge.js';
import { Button } from '../button/button.js';
import { Icon } from '../icon/icon.js';
import {
  formatDistanceIntoKilometers,
  getTowTruckImage,
} from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  truck: TruckWithDistance;
  distance?: number;
  hasButton?: boolean;
  onOrderButtonClick?: () => void;
};

const TowTruckCard: React.FC<Properties> = ({
  truck,
  hasButton = true,
  onOrderButtonClick,
}: Properties) => {
  const {
    manufacturer: manufacturerRaw,
    capacity,
    pricePerKm,
    towType,
    distance,
  } = truck;
  const img = getTowTruckImage(towType);
  const manufacturer = manufacturerKeyToReadableName[manufacturerRaw];
  const distanceInKilometers =
    distance && formatDistanceIntoKilometers(distance);

  return (
    <div className={getValidClassNames(styles.container)}>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.name}>{manufacturer}</div>
          <div className={styles.rating}></div>
          <div className={styles.capacity}>
            <Icon iconName={IconName.GEAR} />
            {capacity} ton
          </div>
        </div>
        <div className={styles.aside}>
          <img src={img} alt={manufacturer} className={styles.img} />
          <Badge className={styles.badge}>free</Badge>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={hasButton ? styles.info : styles['info-wide']}>
          <div className={styles.price}>
            ${pricePerKm}/ <span className={styles.gray}>km</span>
          </div>
          <Badge color="grey">
            <Icon iconName={IconName.LOCATION_DOT} />
            <span className={styles.km}>{distanceInKilometers} km</span>
          </Badge>
        </div>
        {hasButton && <Button label="order now" onClick={onOrderButtonClick} />}
      </div>
    </div>
  );
};

export { TowTruckCard };
