import { Spinner } from '~/libs/components/components.js';
import { TowTruckCard } from '~/libs/components/tow-truck-card/tow-truck-card.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { selectTrucks } from '~/slices/trucks/selectors.js';

import styles from './styles.module.scss';

const TruckList: React.FC = () => {
  const trucks = useAppSelector(selectTrucks);

  return (
    <>
      <h2 className={getValidClassNames('textMd', styles.title)}>Tow Trucks</h2>
      {trucks.length === 0 && <Spinner />}
      <ul className={styles.list}>
        {trucks.map((truck) => (
          <li className={styles.card} key={truck.id}>
            <TowTruckCard truck={truck} />
          </li>
        ))}
      </ul>
    </>
  );
};

export { TruckList };
