import { NavLink } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';

import { AppLogo, Button } from '../components.js';
import styles from './header.module.scss';

type HeaderProperties = {
  onSignIn: () => void;
};

const Header: React.FC<HeaderProperties> = ({ onSignIn }: HeaderProperties) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <NavLink className={styles.logoContainer} to={AppRoute.ROOT}>
        <AppLogo />
      </NavLink>
      <div className={styles.navMenu}>
        <Button label="Sign In" type="button" />
      </div>
    </div>
  </div>
);

export { Header };
