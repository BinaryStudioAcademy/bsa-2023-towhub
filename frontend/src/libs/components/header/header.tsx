import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { AppLogo, BurgerMenu, Button, Link } from '../components.js';
import { getBurgerMenuItems, getFullName } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const user = useAuthUser();

  const navigate = useNavigate();

  const burgerItems = getBurgerMenuItems(user?.group.key ?? null);

  const handleSignIn = useCallback(() => {
    navigate(AppRoute.SIGN_IN);
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate(AppRoute.WELCOME);
  }, [navigate]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} to={AppRoute.ROOT}>
          <AppLogo />
        </Link>
        <div className={styles.navMenu}>
          {user ? (
            <>
              <div className={getValidClassNames('textMd', styles.welcome)}>
                Hello, {getFullName(user.firstName, user.lastName)}
              </div>
              <BurgerMenu burgerItems={burgerItems} />
            </>
          ) : (
            <>
              <Button
                label="Sign Up"
                className={styles.button}
                type="button"
                onClick={handleSignUp}
              />
              <Button
                label="Sign In"
                className={styles.button}
                type="button"
                onClick={handleSignIn}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
