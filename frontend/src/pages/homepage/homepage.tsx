import { TruckFilter } from '~/libs/components/components.js';
import { TruckFilterField } from '~/libs/enums/enums.js';
import {
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useHomePageSocketService,
  useMemo,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type TruckFilters } from '~/libs/types/types.js';
import { selectSocketStatus } from '~/slices/socket/selectors.js';

import { Map } from './components/map/map.js';
import { TruckList } from './components/truck-list/truck-list.js';
import { getSortedTrucks, getTrucksLocations } from './libs/helpers/helpers.js';
import { useGetTrucksWithDistance } from './libs/hooks/hooks.js';
import styles from './styles.module.scss';

const initialState = {
  id: TruckFilterField.LOCATION,
  desc: false,
};

const HomePage: React.FC = () => {
  const socketStatus = useAppSelector(selectSocketStatus);

  const mapReference = useRef<HTMLDivElement | null>(null);

  useAppMap({
    center: null,
    destination: null,
    className: styles.map,
    mapReference: mapReference,
  });
  const [location, setLocation] = useState<google.maps.LatLngLiteral>();
  const [filters, setFilters] = useState<TruckFilters>(initialState);
  const trucks = useGetTrucksWithDistance(location);

  const sortedTrucks = useMemo(
    () => getSortedTrucks(trucks, filters),
    [filters, trucks],
  );
  const truckMarkers = useMemo(() => getTrucksLocations(trucks), [trucks]);

  const handleLocationChange = useCallback(
    (location: { lat: number; lng: number }) => {
      setLocation(location);
      setFilters(initialState);
    },
    [],
  );

  const { connectToHomeRoom, disconnectFromHomeRoom } =
    useHomePageSocketService();

  useEffect(() => {
    connectToHomeRoom();

    return () => {
      disconnectFromHomeRoom();
    };
  }, [connectToHomeRoom, disconnectFromHomeRoom, socketStatus]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.trucks}>
        <TruckFilter
          filters={filters}
          onFilterChange={setFilters}
          onLocationChange={handleLocationChange}
        />
        <TruckList trucks={sortedTrucks} />
      </section>
      <section className={styles.map}>
        <Map markers={truckMarkers} userLocation={location} />
      </section>
    </div>
  );
};

export { HomePage };
