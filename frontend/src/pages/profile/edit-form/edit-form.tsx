import { type UserEntityObjectWithGroupAndBusinessT } from 'shared/build';

import { Form } from '~/libs/components/components.js';
import { AuthMode } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import {
  type CustomerSignUpRequestDto,
  type ValueOf,
} from '~/libs/types/types.js';
import {
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
} from '~/packages/users/users.js';
import {
  signUpBusinessFields,
  signUpCustomerFields,
} from '~/pages/auth/components/sign-up-form/libs/fields.js';
import { selectUser } from '~/slices/auth/selectors.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: CustomerSignUpRequestDto) => void;
  mode: ValueOf<typeof AuthMode>;
};

const EditForm: React.FC<Properties> = ({ onSubmit, mode }: Properties) => {
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Edit profile
      </h3>
      {mode === AuthMode.CUSTOMER && (
        <Form
          defaultValues={user}
          validationSchema={customerSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Save"
          fields={signUpCustomerFields}
        />
      )}
      {mode === AuthMode.BUSINESS && (
        <Form
          defaultValues={user}
          validationSchema={businessSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Save"
          fields={signUpBusinessFields}
        />
      )}
    </div>
  );
};

export { EditForm };
