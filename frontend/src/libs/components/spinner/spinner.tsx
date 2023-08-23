import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  isFullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const Spinner: React.FC<Properties> = ({
  isFullScreen,
  size = 'sm',
}: Properties) => {
  const loaderClassName = getValidClassNames(styles.loader, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
  });

  if (isFullScreen) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={loaderClassName}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={loaderClassName}>Loading...</div>
    </div>
  );
};

export { Spinner };
