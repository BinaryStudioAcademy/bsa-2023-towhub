import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { Map } from '~/libs/components/map/map.js';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';
import { actions as orderActions } from '~/slices/orders/order.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

//  mock
const driverId = 1;

const Order: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    // mock
    lat: 50.4547,
    lng: 30.5238,
  });
  const [destination, setDestination] = useState<google.maps.LatLngLiteral>();

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (payload: OrderCreateRequestDto) => {
      void dispatch(orderActions.createOrder({ ...payload, driverId }))
        .unwrap()
        .then(() => {
          // navigate user here
        });
    },
    [dispatch],
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
          {/* mock */}
          <TowTruckCard
            truck={{
              id: 1,
              year: 2020,
              capacity: 10,
              licensePlateNumber: 'AAA',
              manufacturer: 'volvo',
              towType: 'hook_and_chain',
              pricePerKm: 12,
            }}
            rating={{ reviewCount: 5, averageRating: 4.3 }}
            distance={250}
            hasFooter={false}
          />
          <span>TowTrucks</span>
          <OrderForm
            onSubmit={handleSubmit}
            onLocationChange={handleLocatonChange}
            onDestinationChange={handleDestinationChange}
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
