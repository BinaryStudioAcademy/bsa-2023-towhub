import { type Location } from 'react-router';

import { type AuthMode, AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAuthNavigate,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type CustomerSignUpRequestDto,
  type UserSignInRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.css';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateAuthUser } = useAuthNavigate();

  const location: Location = useLocation();
  const mode = location.state as ValueOf<typeof AuthMode>;

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload))
        .unwrap()
        .then((user) => {
          navigateAuthUser(user);
        });
    },
    [dispatch, navigateAuthUser],
  );

  const handleSignUpSubmit = useCallback(
    (payload: CustomerSignUpRequestDto): void => {
      void dispatch(authActions.signUp({ payload, mode }))
        .unwrap()
        .then((user) => {
          navigateAuthUser(user);
        });
    },
    [dispatch, mode, navigateAuthUser],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} mode={mode} />;
      }
    }

    return null;
  };

  return <div className={styles.page}>{getScreen(location.pathname)}</div>;
};

export { Auth };
