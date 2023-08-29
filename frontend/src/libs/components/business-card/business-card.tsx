import rocket from '~/assets/img/welcome-page/rocket.png';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Button, Image } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onClick: () => void;
};

const BusinessCard: React.FC<Properties> = ({ onClick }: Properties) => {
  return (
    <li className={styles.card}>
      <div>
        <Image src={rocket} alt="rocket" />
      </div>

      <div className={styles['card-container']}>
        <div>
          <h3 className={getValidClassNames('h4', styles.title)}>
            I am an entrepreneur
          </h3>
          <p className={getValidClassNames('text-sm', styles.text)}>
            You can easily add your service to our platform and get your first
            customers in just a few minutes.
          </p>
        </div>

        <Button
          onClick={onClick}
          label={'Continue'}
          className={styles.button}
        />
      </div>
    </li>
  );
};

export { BusinessCard };
