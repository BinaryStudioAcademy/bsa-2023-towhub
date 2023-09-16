import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { Map } from '~/libs/components/map/map.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
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
  const [startAddress, setStartAddress] = useState<string>();
  const [endAddress, setEndAddress] = useState<string>();
  const [location, setLocation] = useState<google.maps.LatLngLiteral>();
  const [destination, setDestination] = useState<google.maps.LatLngLiteral>();
  const [price, setPrice] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chosenTruck = useAppSelector(selectChosenTruck);

  if (!chosenTruck) {
    navigate(AppRoute.ROOT);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setLocation({
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
    });
  }, [dispatch]);

  const handlePriceChange = useCallback(
    (price: number) => {
      setPrice(price);
    },
    [setPrice],
  );

  const handleSubmit = useCallback(
    (payload: OrderCreateRequestDto) => {
      if (chosenTruck) {
        void dispatch(orderActions.createOrder(payload));
      }
    },
    [dispatch, chosenTruck],
  );

  const handleLocatonChange = useCallback(
    (location: { lat: number; lng: number }, address: string) => {
      setLocation(location);
      setStartAddress(address);
    },
    [setLocation],
  );

  const handleDestinationChange = useCallback(
    (destination: { lat: number; lng: number }, address: string) => {
      setDestination(destination);
      setEndAddress(address);
    },
    [setDestination],
  );

  return (
    <section className={styles.page}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        {chosenTruck && (
          <>
            <div className={styles.left}>
              <TowTruckCard
                truck={chosenTruck}
                // mock
                rating={{ reviewCount: 5, averageRating: 4.3 }}
                distance={250}
                hasFooter={false}
              />
              <OrderForm
                onSubmit={handleSubmit}
                onLocationChange={handleLocatonChange}
                onDestinationChange={handleDestinationChange}
                // TODO: Change driverId to truckId
                driverId={chosenTruck.driverId}
                isDisabled={!chosenTruck}
                price={price}
              />
            </div>
            <div className={styles.right}>
              <Map
                center={location}
                zoom={16}
                destination={destination}
                onPriceChange={handlePriceChange}
                pricePerKm={chosenTruck.pricePerKm}
                startAddress={startAddress}
                endAddress={endAddress}
              />
            </div>
          </>
        )}
      </LoadScript>
    </section>
  );
};

export { Order };
