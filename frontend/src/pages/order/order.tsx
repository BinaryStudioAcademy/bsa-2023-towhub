import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { MapInnerComponent } from '~/libs/components/map/map-inner-component/map-inner-component.js';
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
  const [location, setLocation] = useState({ lat: 50.4547, lng: 30.5238 });
  const [destination, setDestination] = useState({
    lat: 50.4507,
    lng: 30.5278,
  });

  const dispatch = useAppDispatch();

  const handleLocatonChange = useCallback(
    (location: { lat: number | undefined; lng: number | undefined }) => {
      setLocation((previous) => {
        return {
          lat: location.lat ?? previous.lat,
          lng: location.lng ?? previous.lng,
        };
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    (payload: OrderCreateRequestDto) => {
      // console.log("click");
      void dispatch(orderActions.createOrder(payload));
      // FIXME
      // .unwrap()
      // .then((response) => {
      //   console.log(response);
      // });
    },
    [dispatch],
  );

  const handleDestinationChange = useCallback(
    (location: { lat: number | undefined; lng: number | undefined }) => {
      setDestination((previous) => {
        return {
          lat: location.lat ?? previous.lat,
          lng: location.lng ?? previous.lng,
        };
      });
    },
    [],
  );

  return (
    <section className={styles.page}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div className={styles.left}>
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
            additionalValues={{ driverId }}
          />
        </div>
        <div className={styles.right}>
          <MapInnerComponent
            center={location}
            zoom={16}
            destination={destination}
          />
        </div>
      </LoadScript>
    </section>
  );
};

export { Order };
