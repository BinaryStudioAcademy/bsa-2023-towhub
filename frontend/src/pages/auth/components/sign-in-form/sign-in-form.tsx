import { Form, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { userSignInValidationSchema } from '~/packages/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants.js';
import { signInFields } from './libs/fields.js';

type Properties = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => (
  <>
    <h3>Sign In</h3>
    <Form
      defaultValues={DEFAULT_SIGN_IN_PAYLOAD}
      validationSchema={userSignInValidationSchema}
      onSubmit={onSubmit}
      btnLabel="Sign In"
      fields={signInFields}
    />
    <p>
      Don`t have an account yet?
      <Link to={AppRoute.SIGN_UP}>Sing up</Link>
    </p>
  </>
);

export { SignInForm };
