import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import { type MenuItem } from '~/libs/types/types.js';

import { AppLogo, BurgerMenu, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  menuItems?: MenuItem[];
  isAuth: boolean;
};

const Header: React.FC<Properties> = ({
  menuItems,
  isAuth = false,
}: Properties) => {
  const navigate = useNavigate();

  const handleSignIn = useCallback(() => {
    navigate(AppRoute.WELCOME);
  }, [navigate]);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoContainer} to={AppRoute.ROOT}>
          <AppLogo />
        </Link>
        <div className={styles.navMenu}>
          {isAuth ? (
            <BurgerMenu menuItems={menuItems} />
          ) : (
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
