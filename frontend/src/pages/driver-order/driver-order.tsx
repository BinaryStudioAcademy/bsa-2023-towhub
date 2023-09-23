import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

const DriverOrder = (): JSX.Element => {
  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <div className={styles['trip-info']}>
          <p className={styles.header}>TRIP INFO</p>
          <div className={styles['trip-info-content']}>
            <span>Distance</span>
            <span>Time</span>
            <span>Price</span>
          </div>
        </div>
        <div className={styles['order-details']}>
          <p className={styles.header}>ORDER DETAILS</p>
          <div>
            <p className={styles.detail}>
              Customer name: <span className={styles.value}>Ann</span>
            </p>
            <p className={styles.detail}>
              Phone: <span className={styles.value}>+380676319541</span>
            </p>
            <p className={styles.detail}>
              Time: <span className={styles.value}>21.07 15:30</span>
            </p>
            <p className={styles.detail}>
              Location: <span className={styles.value}>Address</span>
            </p>
            <p className={styles.detail}>
              Destination: <span className={styles.value}>Address</span>
            </p>
            <p className={styles.detail}>
              Cars need to be towed: <span className={styles.value}>1</span>
            </p>
          </div>
          <p className={styles['comment-header']}>Comment: </p>
          <p className={styles.comment}>
            Hi! I`m near the bridge. There was a small accident. The car must be
            towed out of the ditch.
          </p>
          <div className={styles.buttons}>
            <Button className={styles.button} label={'Decline'} />
            <Button
              className={getValidClassNames(styles.button, styles.accept)}
              label={'Accept'}
            />
          </div>
        </div>
      </div>
      <div className={styles.right}>map</div>
    </section>
  );
};

export { DriverOrder };
