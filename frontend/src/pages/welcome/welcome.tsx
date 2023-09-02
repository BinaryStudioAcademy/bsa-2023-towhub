import { BusinessCard, CustomerCard } from '~/libs/components/components.js';
import { type AuthMode, AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (mode: ValueOf<typeof AuthMode>) => {
      switch (mode) {
        case 'customer': {
          navigate(AppRoute.SIGN_UP_CUSTOMER);
          break;
        }
        case 'business': {
          navigate(AppRoute.SIGN_UP_BUSINESS);
          break;
        }
        default: {
          throw new Error(`Unsupported mode passed: ${String(mode)}`);
        }
      }
    },
    [navigate],
  );

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
