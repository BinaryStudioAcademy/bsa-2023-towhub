import { Form } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import { truckAddValidationSchema } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { ADD_TRUCK_FIELDS } from './libs/add-truck.fields.js';
import { DEFAULT_TRUCK_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

const AddTruckForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(
    (payload: TruckAddRequestDto): void => {
      void dispatch(
        truckActions.addTruck({
          manufacturer: payload.manufacturer.value,
          year: payload.year.value,
          towType: payload.towType.value,
          capacity: payload.capacity,
          pricePerKm: payload.pricePerKm,
          licensePlateNumber: payload.licensePlateNumber,
        }),
      );
    },
    [dispatch],
  );

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add Truck
      </h3>
      <Form
        fields={ADD_TRUCK_FIELDS}
        defaultValues={DEFAULT_TRUCK_PAYLOAD}
        validationSchema={truckAddValidationSchema}
        onSubmit={handleFormSubmit}
        btnLabel="ADD"
      />
    </div>
  );
};

export { AddTruckForm };
