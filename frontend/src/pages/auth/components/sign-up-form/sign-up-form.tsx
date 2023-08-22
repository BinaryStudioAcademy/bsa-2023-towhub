import { Link } from '~/libs/components/components.js';
import { Form } from '~/libs/components/form/form.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { type FormField } from '~/libs/types/form.type.js';
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './libs/constants.js';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const nameField: FormField<UserSignUpRequestDto> = {
    label: 'Name',
    placeholder: 'Enter your name',
    name: 'name',
  };
  const surnameField: FormField<UserSignUpRequestDto> = {
    label: 'Surname',
    placeholder: 'Enter your surname',
    name: 'surname',
  };
  const emailField: FormField<UserSignUpRequestDto> = {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    name: 'email',
  };
  const phoneField: FormField<UserSignUpRequestDto> = {
    label: 'Phone',
    placeholder: 'Enter your phone',
    name: 'phone',
  };
  const passwordField: FormField<UserSignUpRequestDto> = {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    name: 'password',
  };

  return (
    <>
      <h3>Sign Up</h3>
      <Form
        defaultValues={DEFAULT_SIGN_UP_PAYLOAD}
        validationSchema={userSignUpValidationSchema}
        onSubmit={onSubmit}
        btnLabel="Create Account"
        fields={[
          nameField,
          surnameField,
          emailField,
          phoneField,
          passwordField,
        ]}
      />
      <p>
        Already have an account? Go to <Link to={AppRoute.SIGN_IN}>Log in</Link>
      </p>
    </>
  );
};

export { SignUpForm };
