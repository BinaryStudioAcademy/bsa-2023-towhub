import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

import styles from './style.module.scss';

const NotFound = (): JSX.Element => (
  <div className={styles.page}>
    <h1 className={styles.code}>404</h1>
    <p className={styles.message}>OOPS! PAGE NOT FOUND</p>
    <Link className={styles.link} to={AppRoute.WELCOME}>
      GO TO HOMEPAGE
    </Link>
  </div>
);

export { NotFound };
