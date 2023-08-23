import '~/assets/css/typography.scss';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onClick: () => void;
};

const CustomerCard: React.FC<Properties> = ({ onClick }: Properties) => {
  return (
    <li className={styles.card}>
      <div>
        <h3 className={`h4 ${styles.title}`}>I am a customer</h3>
        <p className={`text-sm ${styles.text}`}>
          Create an account for additional features such as orders history, tow
          truck reviews, etc.
        </p>

        <Button onClick={onClick} label={'Continue'} />
      </div>
    </li>
  );
};

export { CustomerCard };
