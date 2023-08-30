import { Form } from '~/libs/components/components.js';
import { type CustomerSignUpRequestDto } from '~/libs/types/types.js';
import { driverSignUpValidationSchema } from '~/packages/users/users.js';

import { DEFAULT_ADD_DRIVER_PAYLOAD } from './libs/constants.js';
import { addDriverFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: CustomerSignUpRequestDto) => void;
};

const AddDriverForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Add driver</h3>
      <Form
        defaultValues={DEFAULT_ADD_DRIVER_PAYLOAD}
        validationSchema={driverSignUpValidationSchema}
        onSubmit={onSubmit}
        btnLabel="Add driver"
        fields={addDriverFields}
      />
    </div>
  );
};

export { AddDriverForm };
