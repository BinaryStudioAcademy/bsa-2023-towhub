import { businessSignUpValidationSchema } from 'shared/build/index.js';

import { Form, Link } from '~/libs/components/components.js';
import { AppRoute, AuthMode } from '~/libs/enums/enums.js';
import { type CustomerSignUpRequestDto } from '~/libs/types/types.js';
import { customerSignUpValidationSchema } from '~/packages/users/users.js';

import {
  DEFAULT_SIGN_UP_PAYLOAD_BUSINESS,
  DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER,
} from './libs/constants.js';
import { signUpBusinessFields, signUpCustomerFields } from './libs/fields.js';

type Properties = {
  onSubmit: (payload: CustomerSignUpRequestDto) => void;
  mode: string;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit, mode }: Properties) => {
  return (
    <>
      <h3>Sign Up</h3>
      {mode === AuthMode.CUSTOMER ? (
        <Form
          defaultValues={DEFAULT_SIGN_UP_PAYLOAD_CUSTOMER}
          validationSchema={customerSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Create Account"
          fields={signUpCustomerFields}
        />
      ) : (
        <Form
          defaultValues={DEFAULT_SIGN_UP_PAYLOAD_BUSINESS}
          validationSchema={businessSignUpValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Create Account"
          fields={signUpBusinessFields}
        />
      )}

      <p>
        Already have an account? Go to <Link to={AppRoute.SIGN_IN}>Log in</Link>
      </p>
    </>
  );
};

export { SignUpForm };
