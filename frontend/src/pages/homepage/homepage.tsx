import { type Libraries, LoadScript } from '@react-google-maps/api';

import { Map } from '~/libs/components/map/map.js';
import { useEffect, useHomePageSocketService } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import { TruckList } from './components/truck-list/truck-list.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const HomePage: React.FC = () => {
  const { connectToHomeRoom, disconnectFromHomeRoom } =
    useHomePageSocketService();

  useEffect(() => {
    connectToHomeRoom();

    return () => {
      disconnectFromHomeRoom();
    };
  }, [connectToHomeRoom, disconnectFromHomeRoom]);

  return (
    <LoadScript
      googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className={styles.container}>
        <section className={styles.trucks}>
          <TruckList />
        </section>
        <section className={styles.map}>
          <Map className={styles['map-component']} zoom={16} />
        </section>
      </div>
    </LoadScript>
  );
};

export { HomePage };
