import { Form } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  type DriverDto,
  driverUpdateRequestBody,
} from '~/packages/drivers/drivers.js';

import { DEFAULT_ADD_DRIVER_PAYLOAD } from './libs/constants.js';
import { addDriverFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: DriverDto) => void;
};

const AddDriverForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add driver
      </h3>
      <Form
        defaultValues={DEFAULT_ADD_DRIVER_PAYLOAD}
        validationSchema={driverUpdateRequestBody}
        onSubmit={onSubmit}
        btnLabel="Add driver"
        fields={addDriverFields}
      />
    </div>
  );
};

export { AddDriverForm };
