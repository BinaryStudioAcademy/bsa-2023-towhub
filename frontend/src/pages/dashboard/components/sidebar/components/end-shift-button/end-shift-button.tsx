import { Button } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/icon-name.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { manufacturerKeyToReadableName } from '~/packages/trucks/libs/maps/manufacturer-key-to-readable-name.map';
import { actions as driverActions } from '~/slices/driver/driver.js';
import { ShiftStatus } from '~/slices/driver/libs/enums/enums.js';
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

  const manufacturerName =
    truck && manufacturerKeyToReadableName[truck.manufacturer];

  return isActive ? (
    <div className={styles.block}>
      <p className={getValidClassNames(styles.truckInfo, 'textMd')}>
        {manufacturerName} {truck?.licensePlateNumber}
      </p>
      <Button
        label={'End shift'}
        frontIcon={IconName.TRUCK}
        onClick={handleClick}
        className={styles.button}
      />
    </div>
  ) : null;
};

export { EndShiftButton };
