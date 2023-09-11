import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { MapInnerComponent } from '~/libs/components/map/map-inner-component/map-inner-component.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Order: React.FC = () => {
  const [location, setLocation] = useState({ lat: 50.4547, lng: 30.5238 });
  const [destination, setDestination] = useState({
    lat: 50.4507,
    lng: 30.5278,
  });

  const handleLocatonChange = useCallback(
    (location: { lat: number | undefined; lng: number | undefined }) => {
      // console.log('data', values);
      setLocation((previous) => {
        return {
          lat: location.lat ?? previous.lat,
          lng: location.lng ?? previous.lng,
        };
      });
    },
    [],
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
    <section className={styles.page} style={{ display: 'flex' }}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div style={{ width: '35%', marginRight: '15px' }}>
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
            onLocationChange={handleLocatonChange}
            onDestinationChange={handleDestinationChange}
          />
        </div>
        <div
          style={{
            width: '65%',
            height: 'calc(100vh - 120px)',
            border: '5px solid white',
          }}
        >
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
