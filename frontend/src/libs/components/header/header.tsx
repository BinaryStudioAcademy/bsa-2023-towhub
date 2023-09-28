import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useNavigate } from '~/libs/hooks/hooks.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { AppLogo, BurgerMenu, Button, Link } from '../components.js';
import { getBurgerMenuItems } from './libs/helpers/helpers.js';
import { userGroupToRedirectLink } from './libs/maps/maps.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const user = useAuthUser();

  const navigate = useNavigate();

  const burgerItems = getBurgerMenuItems(user?.group.key ?? null);
  const navigateTo = useMemo(() => {
    return user?.group
      ? userGroupToRedirectLink[user.group.key]
      : AppRoute.ROOT;
  }, [user]);

  const handleSignIn = useCallback(() => {
    navigate(AppRoute.SIGN_IN);
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate(AppRoute.WELCOME);
  }, [navigate]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} to={navigateTo}>
          <AppLogo />
        </Link>
        <div className={styles.navMenu}>
          {user ? (
            <>
              <div className={getValidClassNames('textMd', styles.welcome)}>
                Hello, {user.firstName}
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
