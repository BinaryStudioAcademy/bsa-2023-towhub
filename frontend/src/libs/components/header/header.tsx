import { NavLink } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { AppLogo } from '../components.js';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const handleSignIn = useCallback(() => {
    return;
  }, []);

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <NavLink className={styles.logoContainer} to={AppRoute.ROOT}>
          <AppLogo />
        </NavLink>
        <div className={styles.navMenu}>
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export { Header };
