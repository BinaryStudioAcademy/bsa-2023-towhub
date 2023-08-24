import { BusinessCard, CustomerCard } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(AppRoute.SIGN_UP);
  }, [navigate]);

  return (
    <section className={styles.section}>
      <h2 className={getValidClassNames('h4', styles.title)}>
        Welcome to the <span className={styles.accent}>TowHub</span>! Let&apos;s
        get to know each other better
      </h2>

      <ul className={styles.list}>
        <BusinessCard onClick={handleClick} />
        <CustomerCard onClick={handleClick} />
      </ul>
    </section>
  );
};

export { WelcomePage };
