import { Button } from '~/libs/components/components.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { Map } from '~/libs/components/map/map.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { config } from '~/libs/packages/config/config.js';
import { LoadScript } from '~/libs/types/types.js';

import styles from './styles.module.scss';

// TODO: REMOVE MOCK
const TRIP_INFO = {
  distance: 10,
  time: 30,
  price: 40,
};

const ORDER_DETAILS = {
  customerName: 'Ann',
  phone: '+380676319541',
  time: '15:20',
  location: 'Address 1',
  destination: 'Address 2',
  cars: 1,
};

const DriverOrder = (): JSX.Element => {
  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <div className={styles['trip-info']}>
          <p className={styles.header}>TRIP INFO</p>
          <div className={styles['trip-info-content']}>
            <span className={styles.item}>
              Distance: <span>{TRIP_INFO.distance}km</span>
            </span>
            <span className={styles.item}>
              Time: <span>{TRIP_INFO.time} minutes</span>
            </span>
            <span className={styles.item}>
              Price: <span>${TRIP_INFO.price}</span>
            </span>
          </div>
        </div>
        <div className={styles['order-details']}>
          <p className={styles.header}>ORDER DETAILS</p>
          <div>
            <p className={styles.detail}>
              <Icon className={styles['user-icon']} iconName="user" /> Customer
              name:{' '}
              <span className={styles.value}>{ORDER_DETAILS.customerName}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles['phone-icon']} iconName="phone" /> Phone:{' '}
              <span className={styles.value}>{ORDER_DETAILS.phone}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles['time-icon']} iconName="clock" /> Time:{' '}
              <span className={styles.value}>{ORDER_DETAILS.time}</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={styles['location-icon']}
                iconName="location dot"
              />{' '}
              Location:{' '}
              <span className={styles.value}>{ORDER_DETAILS.location}</span>
            </p>
            <p className={styles.detail}>
              <Icon
                className={styles['destination-icon']}
                iconName="location dot"
              />{' '}
              Destination:{' '}
              <span className={styles.value}>{ORDER_DETAILS.destination}</span>
            </p>
            <p className={styles.detail}>
              <Icon className={styles['car-icon']} iconName="car" /> Cars need
              to be towed:{' '}
              <span className={styles.value}>{ORDER_DETAILS.cars}</span>
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
