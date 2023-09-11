import { type Libraries, LoadScript } from '@react-google-maps/api';

import { TowTruckCard } from '~/libs/components/components.js';
import { MapInnerComponent } from '~/libs/components/map/map-inner-component/map-inner-component.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { config } from '~/libs/packages/config/config.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const Order: React.FC = () => {
  const [location, setLocation] = useState({ lat: 50.4547, lng: 30.5238 });

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

  const libraries: Libraries = ['places'];

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
          <OrderForm onLocationChange={handleLocatonChange} />
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
            destination={{ lat: 50.4647, lng: 30.5231 }}
          />
        </div>
      </LoadScript>
    </section>
  );
};

export { Order };
