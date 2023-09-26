import {
  useAppMap,
  useAppSelector,
  useEffect,
  useHomePageSocketService,
  useRef,
} from '~/libs/hooks/hooks.js';
import { selectTrucks } from '~/slices/trucks/selectors.js';

import { TruckList } from './components/truck-list/truck-list.js';
import styles from './styles.module.scss';

const HomePage: React.FC = () => {
  const trucks = useAppSelector(selectTrucks);

  const mapReference = useRef<HTMLDivElement>(null);

  useAppMap({
    center: null,
    destination: null,
    className: styles.map,
    mapReference: mapReference,
  });

  const { connectToHomeRoom, disconnectFromHomeRoom } =
    useHomePageSocketService();

  useEffect(() => {
    connectToHomeRoom();

    return () => {
      disconnectFromHomeRoom();
    };
  }, [connectToHomeRoom, disconnectFromHomeRoom]);

  return (
    <div className={styles.container}>
      <section className={styles.trucks}>
        <TruckList trucks={trucks} />
      </section>
      <section className={styles.map}>
        <div ref={mapReference} id="map" className={styles.map} />
      </section>
    </div>
  );
};

export { HomePage };
