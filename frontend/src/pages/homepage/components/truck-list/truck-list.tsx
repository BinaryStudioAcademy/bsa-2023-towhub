import { Spinner } from '~/libs/components/components.js';
import { TowTruckCard } from '~/libs/components/tow-truck-card/tow-truck-card.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector, useMemo } from '~/libs/hooks/hooks.js';
import { selectTrucks } from '~/slices/trucks/selectors.js';

import styles from './styles.module.scss';

type MockDataRating = {
  averageRating: number;
  reviewCount: number;
};

const getMockRating = (): MockDataRating => {
  const averageRating = Math.floor(Math.random() * 3) + 3;
  const reviewCount = Math.floor(Math.random() * 15) + 1;

  return {
    averageRating,
    reviewCount,
  };
};

const getMockDistance = (): number => Math.floor(Math.random() * 50) + 1;

const TruckList: React.FC = () => {
  const trucks = useAppSelector(selectTrucks);

  const mockData = useMemo(() => {
    const data = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < trucks.length; index++) {
      data.push({ rating: getMockRating(), distance: getMockDistance() });
    }

    return data;
  }, [trucks.length]);

  return (
    <>
      <h2 className={getValidClassNames('textMd', styles.title)}>Tow Trucks</h2>
      {trucks.length === 0 && <Spinner />}
      <ul className={styles.list}>
        {trucks.map((truck, index) => (
          <li className={styles.card} key={truck.id}>
            <TowTruckCard
              truck={truck}
              rating={mockData[index].rating}
              distance={mockData[index].distance}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export { TruckList };
