import { Form } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import { truckAddValidationSchema } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { ADD_TRUCK_FIELDS } from './libs/add-truck.fields.js';
import { DEFAULT_TRUCK_PAYLOAD } from './libs/constants.js';

const AddTruckForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(
    (payload: TruckAddRequestDto): void => {
      void dispatch(truckActions.addTruck(payload));
    },
    [dispatch],
  );

  const { dataStatus } = useAppSelector(({ trucks }) => ({
    dataStatus: trucks.dataStatus,
  }));

  return (
    <div>
      state: {dataStatus}
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
