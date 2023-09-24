import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { ShiftStatus } from '~/slices/driver/libs/enums/shift-status.enum';
import {
  selectActiveTruck,
  selectShiftStatus,
} from '~/slices/driver/selectors.js';

import styles from './styles.module.scss';

const EndShiftButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const shiftStatus = useAppSelector(selectShiftStatus);
  const truck = useAppSelector(selectActiveTruck);

  const isActive = shiftStatus === ShiftStatus.ACTIVE;

  const handleClick = useCallback(() => {
    void dispatch(driverActions.endShift());
  }, [dispatch]);

  return isActive ? (
    <div className={styles.block}>
      <p className={getValidClassNames(styles.truckInfo, 'textMd')}>
        {truck?.manufacturer} {truck?.licensePlateNumber}
      </p>
      <Button
        label={'End shift'}
        frontIcon={'truck'}
        onClick={handleClick}
        className={styles.button}
      />
    </div>
  ) : null;
};

export { EndShiftButton };
