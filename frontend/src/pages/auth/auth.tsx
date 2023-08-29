import { type Location } from 'react-router';

import { AppRoute } from '~/libs/enums/enums.js';
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
import styles from './styles.module.css';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();

  const location: Location = useLocation();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: CustomerSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return (
          <SignUpForm
            onSubmit={handleSignUpSubmit}
            mode={location.state as string}
          />
        );
      }
    }

    return null;
  };

  return <div className={styles.page}>{getScreen(location.pathname)}</div>;
};

export { Auth };
