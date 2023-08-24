import customer from '~/assets/img/welcome-page/customer.png';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onClick: () => void;
};

const CustomerCard: React.FC<Properties> = ({ onClick }: Properties) => {
  return (
    <li className={styles.card}>
      <div>
        <img src={customer} alt="rocket" className={styles.image} />
      </div>

      <div>
        <h3 className={getValidClassNames('h4', styles.title)}>
          I am a customer
        </h3>

        <p className={getValidClassNames(styles.text, 'text-sm')}>
          Create an account for additional features such as orders history, tow
          truck reviews, etc.
        </p>

        <Button onClick={onClick} label={'Continue'} />
      </div>
    </li>
  );
};

export { CustomerCard };
