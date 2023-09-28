import { Button, Icon } from '~/libs/components/components.js';
import { getTowTruckImage } from '~/libs/components/tow-truck-card/lib/helpers/helpers.js';
import { IconName } from '~/libs/enums/icon-name.enum';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type TruckEntityT } from '~/packages/trucks/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  truck: Pick<
    TruckEntityT,
    'id' | 'towType' | 'manufacturer' | 'capacity' | 'licensePlateNumber'
  >;
  onClick: (truckId: number) => void;
};
const AvailableTruckCard: React.FC<Properties> = ({
  truck: { id, towType, manufacturer, capacity, licensePlateNumber },
  onClick,
}: Properties) => {
  const img = getTowTruckImage(towType);

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.name}>{manufacturer}</div>
          <div className={styles.capacity}>
            <Icon iconName={IconName.GEAR} />
            {capacity} ton
          </div>
        </div>
        <div className={styles.aside}>
          <img src={img} alt={manufacturer} className={styles.img} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div className={styles.licensePlate}>{licensePlateNumber}</div>
        </div>
        <Button label="Choose" onClick={handleClick} />
      </div>
    </div>
  );
};

export { AvailableTruckCard };
