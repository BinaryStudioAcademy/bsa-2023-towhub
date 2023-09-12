import { orderCreateRequestBody } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import styles from './styles.module.scss';

type Properties = {
  additionalValues: { driverId: number };
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onLocationChange: ((place: google.maps.LatLngLiteral) => void) | undefined;
  onDestinationChange: ((place: google.maps.LatLngLiteral) => void) | undefined;
};

const OrderForm: React.FC<Properties> = ({
  onSubmit,
  onLocationChange,
  onDestinationChange,
  additionalValues,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Please fill the form</p>
      <Form
        validationSchema={orderCreateRequestBody}
        // FIXME
        fields={[
          { label: 'Name', name: 'customerName' },
          { label: 'Phone', name: 'customerPhone' },
          { label: 'Time', name: 'scheduledTime', type: 'date' },
          { label: 'Location', name: 'startPoint', type: 'location' },
          { label: 'Destination', name: 'endPoint', type: 'location' },
          {
            label: 'How many cars need to be towed',
            name: 'carsQty',
            type: 'number',
          },
        ]}
        // FIXME
        defaultValues={{
          customerName: '',
          customerPhone: '',
          scheduledTime: '',
          startPoint: '',
          endPoint: '',
          carsQty: 1,
        }}
        onSubmit={onSubmit}
        onLocationChange={onLocationChange}
        onDestinationChange={onDestinationChange}
        additionalValues={additionalValues}
      />
    </div>
  );
};

export { OrderForm };
