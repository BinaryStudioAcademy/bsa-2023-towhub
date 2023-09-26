import { TowTruckCard } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { DEFAULT_CENTER } from '~/libs/packages/map/libs/constants/constants.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';
import { actions as orderActions, selectPrice } from '~/slices/orders/order.js';
import { selectChosenTruck } from '~/slices/trucks/selectors.js';

import { NotFound } from '../not-found/not-found.js';
import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const Order = (): JSX.Element => {
  const [startAddress, setStartAddress] = useState<string>();
  const [endAddress, setEndAddress] = useState<string>();
  const [startLocation, setStartLocation] =
    useState<google.maps.LatLngLiteral>();
  const [endLocation, setEndLocation] = useState<google.maps.LatLngLiteral>();

  const dispatch = useAppDispatch();

  const chosenTruck = useAppSelector(selectChosenTruck);
  const price = useAppSelector(selectPrice);

  const mapReference = useRef<HTMLDivElement | null>(null);

  useAppMap({
    center: startLocation ?? DEFAULT_CENTER,
    destination: endLocation ?? null,
    className: styles.right,
    mapReference: mapReference,
    pricePerKm: chosenTruck?.pricePerKm,
    startAddress,
    endAddress,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setStartLocation({
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      });
    });
  }, [dispatch]);

  const handleSubmit = useCallback(
    (payload: OrderCreateRequestDto) => {
      if (chosenTruck) {
        void dispatch(orderActions.createOrder(payload));
      }
    },
    [chosenTruck, dispatch],
  );

  const handleLocationChange = useCallback(
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

  if (!chosenTruck) {
    return <NotFound />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.left}>
        <TowTruckCard truck={chosenTruck} hasButton={false} />
        <OrderForm
          onSubmit={handleSubmit}
          onStartLocationChange={handleLocationChange}
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
        <div ref={mapReference} id="map" className={styles.right} />
      </div>
    </section>
  );
};

export { Order };
