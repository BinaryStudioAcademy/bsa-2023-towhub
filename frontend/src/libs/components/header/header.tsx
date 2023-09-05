import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import { type BurgerMenuItem } from '~/libs/types/types.js';

import { AppLogo, BurgerMenu, Button, Link } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  menuItems?: BurgerMenuItem[];
  isAuth: boolean;
};

const Header: React.FC<Properties> = ({ menuItems, isAuth }: Properties) => {
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
            <Button
              label="Sign In"
              className={styles.btn}
              type="button"
              onClick={handleSignIn}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
