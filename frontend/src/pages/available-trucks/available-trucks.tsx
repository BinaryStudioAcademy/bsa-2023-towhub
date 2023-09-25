import { Spinner } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { TruckStatus } from '~/packages/trucks/libs/enums/enums.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import {
  ShiftStatus,
  TruckChoiceStatus,
} from '~/slices/driver/libs/enums/enums.js';
import {
  selectShiftStatus,
  selectTruckChoiceStatus,
} from '~/slices/driver/selectors.js';
import { selectDataStatus, selectTrucks } from '~/slices/trucks/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { AvailableTruckCard } from './libs/components/components.js';
import styles from './styles.module.scss';

const AvailableTrucks: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const dataStatus = useAppSelector(selectDataStatus);
  const trucks = useAppSelector(selectTrucks);
  const areTrucksLoading = dataStatus === DataStatus.PENDING;
  const navigate = useNavigate();
  const truckChoiceStatus = useAppSelector(selectTruckChoiceStatus);
  const isTruckBeingChosen = truckChoiceStatus === TruckChoiceStatus.PENDING;
  const shiftStatus = useAppSelector(selectShiftStatus);

  useEffect(() => {
    if (user) {
      void dispatch(truckActions.getAllTrucksByUserId({ userId: user.id }));
    }
  }, [dispatch, user]);

  const handleClick = useCallback(
    (truckId: number) => {
      void dispatch(driverActions.startShift({ truckId }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (shiftStatus === ShiftStatus.ACTIVE) {
      navigate(AppRoute.ORDERS);
    }
  }, [shiftStatus, navigate]);

  return (
    <div className={styles.page}>
      {areTrucksLoading || isTruckBeingChosen ? (
        <Spinner isFullScreen />
      ) : (
        <div className={styles.cardsContainer}>
          {trucks
            .filter((truck) => truck.status === TruckStatus.AVAILABLE)
            .map((truck) => (
              <AvailableTruckCard
                key={truck.id}
                truck={truck}
                onClick={handleClick}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export { AvailableTrucks };
