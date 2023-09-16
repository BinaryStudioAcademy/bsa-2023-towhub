import { RouterOutlet } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <RouterOutlet />
    </div>
  );
};

export { Dashboard };
