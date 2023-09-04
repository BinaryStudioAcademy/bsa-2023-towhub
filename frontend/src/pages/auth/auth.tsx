import { type Location } from 'react-router';

import { AppRoute, AuthMode } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type CustomerSignUpRequestDto,
  type UserSignInRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import { useAuthNavigate } from './libs/hooks/hooks.js';
import styles from './styles.module.css';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateAuthUser } = useAuthNavigate();

  const location: Location = useLocation();

  const handleSignInSubmit = useCallback(
    async (payload: UserSignInRequestDto): Promise<void> => {
      const user = await dispatch(authActions.signIn(payload)).unwrap();
      navigateAuthUser(user);
    },
    [dispatch, navigateAuthUser],
  );

  const handleSignUpSubmit = useCallback(
    async (payload: CustomerSignUpRequestDto): Promise<void> => {
      const mode =
        location.pathname === AppRoute.SIGN_UP_BUSINESS
          ? AuthMode.BUSINESS
          : AuthMode.CUSTOMER;

      const user = await dispatch(
        authActions.signUp({ payload, mode }),
      ).unwrap();
      navigateAuthUser(user);
    },
    [dispatch, location, navigateAuthUser],
  );

  const getScreen = useCallback((): React.ReactNode => {
    switch (location.pathname) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP_BUSINESS: {
        return (
          <SignUpForm onSubmit={handleSignUpSubmit} mode={AuthMode.BUSINESS} />
        );
      }
      case AppRoute.SIGN_UP_CUSTOMER: {
        return (
          <SignUpForm onSubmit={handleSignUpSubmit} mode={AuthMode.CUSTOMER} />
        );
      }
    }

    return null;
  }, [handleSignInSubmit, handleSignUpSubmit, location.pathname]);

  return <div className={styles.page}>{getScreen()}</div>;
};

export { Auth };
