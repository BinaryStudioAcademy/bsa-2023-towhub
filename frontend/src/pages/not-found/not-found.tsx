import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(AppRoute.ROOT);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>OOPS! PAGE NOT FOUND</p>
      <Button
        className={styles.link}
        label="GO TO HOMEPAGE"
        onClick={handleClick}
      />
    </div>
  );
};

export { NotFound };
