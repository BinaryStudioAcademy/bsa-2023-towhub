import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';

import { AppLogo, Link } from '../components.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
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
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export { Header };
