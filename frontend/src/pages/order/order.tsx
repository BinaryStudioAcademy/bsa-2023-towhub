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
import { type Libraries, LoadScript } from '~/libs/types/types.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';
import { actions as orderActions } from '~/slices/orders/order.js';
import { selectChosenTruck } from '~/slices/trucks/selectors.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Order: React.FC = () => {
  const [startAddress, setStartAddress] = useState<string>();
  const [endAddress, setEndAddress] = useState<string>();
  const [startLocation, setStartLocation] =
    useState<google.maps.LatLngLiteral>();
  const [endLocation, setEndLocation] = useState<google.maps.LatLngLiteral>();
  const [price, setPrice] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chosenTruck = useAppSelector(selectChosenTruck);

  if (!chosenTruck) {
    navigate(AppRoute.ROOT);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setStartLocation({
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
      setStartLocation(location);
      setStartAddress(address);
    },
    [setStartLocation],
  );

  const handleDestinationChange = useCallback(
    (destination: { lat: number; lng: number }, address: string) => {
      setEndLocation(destination);
      setEndAddress(address);
    },
    [setEndLocation],
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
                // TODO: REMOVE MOCK
                rating={{ reviewCount: 5, averageRating: 4.3 }}
                distance={250}
                hasFooter={false}
              />
              <OrderForm
                onSubmit={handleSubmit}
                onStartLocationChange={handleLocatonChange}
                onEndLocationChange={handleDestinationChange}
                truckId={chosenTruck.id}
                isDisabled={!chosenTruck}
              >
                <div className={styles.price}>
                  <span>Price:</span>
                  <span>${price}</span>
                </div>
              </OrderForm>
            </div>
            <div className={styles.right}>
              <Map
                center={startLocation}
                destination={endLocation}
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
