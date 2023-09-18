import { Form, Link } from '~/libs/components/components.js';
import { AppRoute, AuthMode } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  type CustomerSignUpRequestDto,
  type ServerErrorHandling,
  type ValueOf,
} from '~/libs/types/types.js';
import {
  businessSignUpValidationSchema,
  customerSignUpValidationSchema,
} from '~/packages/users/users.js';

import {
  DEFAULT_SIGN_UP_PAYLOAD_BUSINESS,
  DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER,
} from './libs/constants.js';
import { signUpBusinessFields, signUpCustomerFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: CustomerSignUpRequestDto) => void;
  mode: ValueOf<typeof AuthMode>;
  serverError: ServerErrorHandling;
};

const SignUpForm: React.FC<Properties> = ({
  onSubmit,
  mode,
  serverError,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Sign Up
      </h3>
      {mode === AuthMode.CUSTOMER ? (
        <Form
          defaultValues={DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER}
          validationSchema={customerSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Create Account"
          fields={signUpCustomerFields}
          serverError={serverError}
        />
      ) : (
        <Form
          defaultValues={DEFAULT_SIGN_UP_PAYLOAD_BUSINESS}
          validationSchema={businessSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Create Account"
          fields={signUpBusinessFields}
          serverError={serverError}
        />
      )}

      <p className={getValidClassNames('textSm', styles.text)}>
        Already have an account? Go to{' '}
        <Link to={AppRoute.SIGN_IN} className={styles.link}>
          Sign in
        </Link>
      </p>
    </div>
  );
};

export { SignUpForm };
