import { type Location } from 'react-router';

import { AppRoute, AuthMode } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAuthNavigate,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type CustomerSignUpRequestDto,
  type UserSignInRequestDto,
} from '~/packages/users/users.js';
import {
  actions as authActions,
  useAuthServerError,
  useAuthUser,
} from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateAuthUser } = useAuthNavigate();

  const serverError = useAuthServerError();

  const location: Location = useLocation();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: CustomerSignUpRequestDto): void => {
      const mode =
        location.pathname === AppRoute.SIGN_UP_BUSINESS
          ? AuthMode.BUSINESS
          : AuthMode.CUSTOMER;

      void dispatch(authActions.signUp({ payload, mode }));
    },
    [dispatch, location],
  );

  const user = useAuthUser();

  if (user) {
    navigateAuthUser(user);
  }

  const getScreen = useCallback((): React.ReactNode => {
    switch (location.pathname) {
      case AppRoute.SIGN_IN: {
        return (
          <SignInForm onSubmit={handleSignInSubmit} serverError={serverError} />
        );
      }
      case AppRoute.SIGN_UP_BUSINESS: {
        return (
          <SignUpForm
            onSubmit={handleSignUpSubmit}
            mode={AuthMode.BUSINESS}
            serverError={serverError}
          />
        );
      }
      case AppRoute.SIGN_UP_CUSTOMER: {
        return (
          <SignUpForm
            onSubmit={handleSignUpSubmit}
            mode={AuthMode.CUSTOMER}
            serverError={serverError}
          />
        );
      }
    }

    return null;
  }, [handleSignInSubmit, handleSignUpSubmit, location.pathname, serverError]);

  return <div className={styles.page}>{getScreen()}</div>;
};

export { Auth };
