import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

const Background = (): JSX.Element => {
  return (
    <div className={styles.background}>
      <div className={getValidClassNames(styles.dashline, styles.big)}>
        <div className={styles.bus}></div>
      </div>
      <div className={getValidClassNames(styles.dashline, styles.small)}></div>
    </div>
  );
};

export { Background };
