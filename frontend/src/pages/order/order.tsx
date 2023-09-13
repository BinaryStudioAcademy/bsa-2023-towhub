import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { Map } from '~/libs/components/map/map.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectChosenTruck } from '~/slices/trucks/selectors.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Order: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>();
  const [destination, setDestination] = useState<google.maps.LatLngLiteral>();

  const dispatch = useAppDispatch();

  const chosenTruck = useAppSelector(selectChosenTruck);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
    });
  }, [setLocation, dispatch]);

  const handleSubmit = useCallback(
    (payload: OrderCreateRequestDto) => {
      if (chosenTruck) {
        void dispatch(
          orderActions.createOrder({
            ...payload,
            driverId: chosenTruck.driverId,
          }),
        );
      }
    },
    [dispatch, chosenTruck],
  );

  const handleLocatonChange = useCallback(
    (location: { lat: number; lng: number }) => {
      setLocation(location);
    },
    [setLocation],
  );

  const handleDestinationChange = useCallback(
    (destination: { lat: number; lng: number }) => {
      setDestination(destination);
    },
    [setDestination],
  );

  return (
    <section className={styles.page}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div className={styles.left}>
          {chosenTruck ? (
            <TowTruckCard
              truck={chosenTruck}
              rating={{ reviewCount: 5, averageRating: 4.3 }}
              distance={250}
              hasFooter={false}
            />
          ) : (
            <p>No truck is chosen!</p>
          )}
          <span>TowTrucks</span>
          <OrderForm
            onSubmit={handleSubmit}
            onLocationChange={handleLocatonChange}
            onDestinationChange={handleDestinationChange}
            isDisabled={!chosenTruck}
          />
        </div>
        <div className={styles.right}>
          <Map center={location} zoom={16} destination={destination} />
        </div>
      </LoadScript>
    </section>
  );
};

export { Order };
