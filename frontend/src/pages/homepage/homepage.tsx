import { type Libraries, LoadScript } from '@react-google-maps/api';

import { Map } from '~/libs/components/map/map.js';
import {
  useAppSelector,
  useEffect,
  useHomePageSocketService,
  useMemo,
} from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import { selectTrucks } from '~/slices/trucks/selectors.js';

import { TruckList } from './components/truck-list/truck-list.js';
import { getTruckLocations } from './libs/helpers/get-truck-locations.helper.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const HomePage: React.FC = () => {
  const trucks = useAppSelector(selectTrucks);

  const truckMarkers = useMemo(() => getTruckLocations(trucks), [trucks]);

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
          <TruckList trucks={trucks} />
        </section>
        <section className={styles.map}>
          <Map className={styles['map-component']} markers={truckMarkers} />
        </section>
      </div>
    </LoadScript>
  );
};

export { HomePage };
