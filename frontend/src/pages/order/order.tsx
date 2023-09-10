import { TowTruckCard } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { OrderForm } from './libs/components/order-form.js';
import styles from './styles.module.scss';

const Order: React.FC = () => {
  const handleLocatonChange = useCallback(
    (values: { lat: number | undefined; lng: number | undefined }) => {
      // console.log('data', values);
      return values;
    },
    [],
  );

  return (
    <section className={styles.page} style={{ display: 'flex' }}>
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
        {/* <Map
          center={{ lat: 50.4547, lng: 30.5238 }}
          zoom={14}
          destination={{ lat: 50.4647, lng: 30.5231 }}
        /> */}
      </div>
    </section>
  );
};

export { Order };
