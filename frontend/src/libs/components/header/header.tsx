import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppSelector,
  useCallback,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { AppLogo, BurgerMenu, Button, Link } from '../components.js';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const hasUser = Boolean(user);

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
          {hasUser ? (
            <BurgerMenu />
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
