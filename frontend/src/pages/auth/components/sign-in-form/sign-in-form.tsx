import { Form, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants.js';
import { signInFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
  serverError: ServerErrorHandling;
};

const SignInForm: React.FC<Properties> = ({
  onSubmit,
  serverError,
}: Properties) => (
  <div className={styles.formWrapper}>
    <h3 className={styles.title}>Sign in</h3>
    <Form
      defaultValues={DEFAULT_SIGN_IN_PAYLOAD}
      validationSchema={userSignInValidationSchema}
      onSubmit={onSubmit}
      btnLabel="Sign In"
      fields={signInFields}
      serverError={serverError}
    />
    <p className={styles.text}>
      Don`t have an account yet?
      <Link to={AppRoute.WELCOME} className={styles.link}>
        {' '}
        Sign up
      </Link>
    </p>
  </div>
);

export { SignInForm };
