import { Spinner } from '~/libs/components/components.js';
import { TowTruckCard } from '~/libs/components/tow-truck-card/tow-truck-card.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { type TruckGetAllResponseDto } from '~/packages/trucks/libs/types/types.js';
import { actions as trucksAction } from '~/slices/trucks/trucks.js';

import styles from './styles.module.scss';

type Properties = {
  trucks: TruckGetAllResponseDto[];
};

const TruckList: React.FC<Properties> = ({ trucks }: Properties) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOrderButtonClick = useCallback(
    (id: number) => () => {
      const truck = trucks.find((truck) => truck.id === id);

      if (truck) {
        dispatch(trucksAction.setChosenTruck(truck));
        navigate(AppRoute.ORDER);
      }
    },
    [dispatch, navigate, trucks],
  );

  return (
    <>
      <h2 className={getValidClassNames('textMd', styles.title)}>Tow Trucks</h2>
      {trucks.length === 0 && <Spinner />}
      <ul className={styles.list}>
        {trucks.map((truck) => (
          <li className={styles.card} key={truck.id}>
            <TowTruckCard
              truck={truck}
              onOrderButtonClick={handleOrderButtonClick(truck.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export { TruckList };
