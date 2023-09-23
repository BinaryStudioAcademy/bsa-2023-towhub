import { Button } from '~/libs/components/components.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { Map } from '~/libs/components/map/map.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { config } from '~/libs/packages/config/config.js';
import { LoadScript } from '~/libs/types/types.js';

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
              <Icon
                className={getValidClassNames(styles.icon, styles['user-icon'])}
                iconName="user"
              />{' '}
              Customer name: <span className={styles.value}>Ann</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={getValidClassNames(
                  styles.icon,
                  styles['phone-icon'],
                )}
                iconName="phone"
              />{' '}
              Phone: <span className={styles.value}>+380676319541</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={getValidClassNames(styles.icon, styles['time-icon'])}
                iconName="clock"
              />{' '}
              Time: <span className={styles.value}>21.07 15:30</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={getValidClassNames(
                  styles.icon,
                  styles['location-icon'],
                )}
                iconName="location dot"
              />{' '}
              Location: <span className={styles.value}>Address</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={getValidClassNames(
                  styles.icon,
                  styles['destination-icon'],
                )}
                iconName="location dot"
              />{' '}
              Destination: <span className={styles.value}>Address</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={getValidClassNames(styles.icon, styles['car-icon'])}
                iconName="car"
              />{' '}
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
      <div className={styles.right}>
        <LoadScript
          libraries={['places']}
          googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        >
          <Map center={{ lat: 21, lng: 22 }} zoom={4} />
        </LoadScript>
      </div>
    </section>
  );
};

export { DriverOrder };
