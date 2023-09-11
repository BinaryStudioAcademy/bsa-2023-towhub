import { Form, Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type TruckEntity } from '~/packages/trucks/libs/types/types.js';
import { truckCreateRequestBody } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { DEFAULT_TRUCK_PAYLOAD } from './libs/constants/constants.js';
import { ADD_TRUCK_FIELDS } from './libs/fields/add-truck.fields.js';
import styles from './styles.module.scss';

type Properties = {
  businessId: number;
  onClose: () => void;
};

const AddTruckForm: React.FC<Properties> = ({
  businessId,
  onClose,
}: Properties) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(
    (payload: Omit<TruckEntity, 'id' | 'businessId'>): void => {
      void dispatch(truckActions.addTruck({ ...payload, businessId }));
      onClose();
    },
    [businessId, dispatch, onClose],
  );

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add Truck
      </h3>
      <Icon
        iconName={IconName.XMARK}
        onClick={onClose}
        className={styles.closeIcon}
      />
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
