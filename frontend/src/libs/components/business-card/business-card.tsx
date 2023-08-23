import '~/assets/css/typography.scss';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onClick: () => void;
};

const BusinessCard: React.FC<Properties> = ({ onClick }: Properties) => {
  return (
    <li className={styles.card}>
      <div>
        <h3 className={`h4 ${styles.title}`}>I am an entrepreneur</h3>
        <p className={`text-sm ${styles.text}`}>
          You can easily add your service to our platform and get your first
          customers in just a few minutes.
        </p>

        <Button onClick={onClick} label={'Continue'} />
      </div>
    </li>
  );
};

export { BusinessCard };
