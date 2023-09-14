import { Map } from '~/libs/components/map/map.js';
import { useEffect, useHomePageSocketService } from '~/libs/hooks/hooks.js';

import { TruckList } from './components/truck-list/truck-list.js';
import styles from './styles.module.scss';

const HomePage: React.FC = () => {
  const { connectToHomeRoom } = useHomePageSocketService();

  useEffect(() => {
    connectToHomeRoom();
  }, [connectToHomeRoom]);

  return (
    <div className={styles.container}>
      <section className={styles.trucks}>
        <TruckList />
      </section>
      <section className={styles.map}>
        <Map
          className={styles['map-component']}
          center={{ lat: 40.711_229, lng: -73.992_401 }}
          zoom={16}
        />
      </section>
    </div>
  );
};

export { HomePage };
