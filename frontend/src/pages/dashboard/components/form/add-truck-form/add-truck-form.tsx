import { Form, Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import { truckCreateRequestBody } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { DEFAULT_TRUCK_PAYLOAD } from './constants/constants.js';
import { ADD_TRUCK_FIELDS } from './fields/add-truck.fields.js';
import styles from './styles.module.scss';

type Properties = {
  onClose: () => void;
  updatePage?: () => void;
};

const AddTruckForm: React.FC<Properties> = ({
  onClose,
  updatePage,
}: Properties) => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(
    (payload: TruckAddRequestDto): void => {
      void dispatch(truckActions.addTruck({ ...payload })).then(updatePage);
      onClose();
    },
    [dispatch, onClose, updatePage],
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
