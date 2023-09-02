import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import { useAuthUser } from '~/slices/auth/auth.js';

import { AppLogo, Button, Link } from '../components.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const user = useAuthUser();

  const handleSignIn = useCallback(() => {
    navigate(AppRoute.SIGN_IN);
  }, [navigate]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} to={AppRoute.ROOT}>
          <AppLogo />
        </Link>
        <div className={styles.navMenu}>
          {user && (
            <div className={getValidClassNames('textMd', styles.welcome)}>
              Hello, {`${user.firstName} ${user.lastName}`}
            </div>
          )}
          <Button
            label="Sign In"
            className={styles.btn}
            type="button"
            onClick={handleSignIn}
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
