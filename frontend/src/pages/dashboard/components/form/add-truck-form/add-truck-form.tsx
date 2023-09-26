import { Form, Icon } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';
import { type TruckAddRequestDto } from '~/packages/trucks/libs/types/types.js';
import { truckCreateRequestBody } from '~/packages/trucks/libs/validation-schemas/validation-schemas.js';

import { DEFAULT_TRUCK_PAYLOAD } from './constants/constants.js';
import { ADD_TRUCK_FIELDS } from './fields/add-truck.fields.js';
import styles from './styles.module.scss';

type Properties = {
  onClose: () => void;
  onSubmit: (payload: TruckAddRequestDto) => void;
  serverError: ServerErrorHandling;
};

const AddTruckForm: React.FC<Properties> = ({
  onClose,
  onSubmit,
  serverError,
}: Properties) => {
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
        onSubmit={onSubmit}
        btnLabel="ADD TRUCK"
        serverError={serverError}
      />
    </div>
  );
};

export { AddTruckForm };
