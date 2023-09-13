import { Form } from '~/libs/components/components.js';
import { FormName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import {
  type DriverCreateUpdateRequestDto,
  driverCreateUpdateRequestBody,
} from '~/packages/drivers/drivers.js';
import { type UserEntityObjectWithGroupAndBusinessT } from '~/packages/drivers/libs/types/types.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { getTrucksByBusinessId } from '~/slices/trucks/actions.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { DEFAULT_ADD_DRIVER_PAYLOAD } from './libs/constants.js';
import { addDriverFields as initialAddDriverFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: DriverCreateUpdateRequestDto) => void;
};

const AddDriverForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const trucks = useAppSelector((state) => state.trucks.trucks);

  useEffect(
    () => void dispatch(getTrucksByBusinessId(user.business.id)),
    [dispatch, user],
  );

  const truckOptions = trucks.map((truck) => ({
    label: truck.licensePlateNumber,
    value: truck.id.toString(),
  }));

  const addDriverFields = initialAddDriverFields.map((field) =>
    field.name === FormName.DRIVER_POSSIBLE_TRUCKS
      ? {
          ...field,
          options: truckOptions,
        }
      : field,
  );

  const handleFormSubmit = useCallback(
    (payload: Omit<DriverCreateUpdateRequestDto, 'businessId'>): void => {
      void dispatch(
        truckActions.addTrucksByUserId({
          trucksId: payload.driverTrucks,
          userId: user.business.ownerId,
        }),
      ).then(() => {
        onSubmit(payload);
      });
    },
    [dispatch, user, onSubmit],
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add driver
      </h3>
      <Form
        defaultValues={DEFAULT_ADD_DRIVER_PAYLOAD}
        validationSchema={driverCreateUpdateRequestBody}
        onSubmit={handleFormSubmit}
        btnLabel="Add driver"
        fields={addDriverFields}
      />
    </div>
  );
};

export { AddDriverForm };
