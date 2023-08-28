import { type IconProp } from '@fortawesome/fontawesome-svg-core';

import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { AppLogo, BurgerMenu, Link } from '../components.js';
import styles from './header.module.scss';

type MenuItem = {
  label: string;
  onClick: () => void;
  icon: IconProp;
};

type Properties = {
  menuItems: MenuItem[];
  isAuth: boolean;
};
const Header: React.FC<Properties> = ({
  menuItems,
  isAuth = false,
}: Properties) => {
  const handleSignIn = useCallback(() => {
    return;
  }, []);

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
