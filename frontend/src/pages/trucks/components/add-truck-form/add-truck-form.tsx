import { type UserEntityObjectWithGroupAndBusinessT } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
import { truckCreateRequestBody } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { DEFAULT_TRUCK_PAYLOAD } from './libs/constants/constants.js';
import { ADD_TRUCK_FIELDS } from './libs/fields/add-truck.fields.js';
import styles from './styles.module.scss';

const AddTruckForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const handleFormSubmit = useCallback(
    (payload: Omit<TruckEntity, 'businessId'>): void => {
      void dispatch(
        truckActions.addTruck({ ...payload, businessId: user.business.id }),
      );
    },
    [dispatch, user],
  );

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add Truck
      </h3>
      <Form
        fields={ADD_TRUCK_FIELDS}
        defaultValues={DEFAULT_TRUCK_PAYLOAD}
        validationSchema={truckCreateRequestBody}
        onSubmit={handleFormSubmit}
        btnLabel="ADD"
      />
    </div>
  );
};

export { AddTruckForm };
