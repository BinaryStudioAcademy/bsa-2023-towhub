import { AuthMode } from 'src/libs/enums/enums.js';

import customer from '~/assets/img/welcome-page/customer.png';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { Button, Image } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onClick: (mode: string) => void;
};

const CustomerCard: React.FC<Properties> = ({ onClick }: Properties) => {
  const handleClick = useCallback((): void => {
    onClick(AuthMode.CUSTOMER);
  }, [onClick]);

  return (
    <li className={styles.card}>
      <div>
        <Image src={customer} alt="customer" />
      </div>

      <div className={styles['card-container']}>
        <div>
          <h3 className={getValidClassNames('h4', styles.title)}>
            I am a customer
          </h3>

          <p className={getValidClassNames(styles.text, 'text-sm')}>
            Create an account for additional features such as orders history,
            tow truck reviews, etc.
          </p>
        </div>

        <Button
          onClick={handleClick}
          label={'Continue'}
          className={styles.button}
        />
      </div>
    </li>
  );
};

export { CustomerCard };
