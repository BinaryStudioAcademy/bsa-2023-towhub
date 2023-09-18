import { Form } from '~/libs/components/components.js';
import { FormName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import {
  type DriverCreateUpdateRequestDto,
  driverCreateUpdateRequestBody,
} from '~/packages/drivers/drivers.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { DEFAULT_ADD_DRIVER_PAYLOAD } from './libs/constants.js';
import { addDriverFields as initialAddDriverFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: DriverCreateUpdateRequestDto) => void;
};

const AddDriverForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const dispatch = useAppDispatch();

  const trucks = useAppSelector((state) => state.trucks.trucks);

  useEffect(
    () => void dispatch(truckActions.getTruckForBusiness()),
    [dispatch],
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

  return (
    <div className={styles.wrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add driver
      </h3>
      <Form
        defaultValues={DEFAULT_ADD_DRIVER_PAYLOAD}
        validationSchema={driverCreateUpdateRequestBody}
        onSubmit={onSubmit}
        btnLabel="Add driver"
        fields={addDriverFields}
      />
    </div>
  );
};

export { AddDriverForm };
