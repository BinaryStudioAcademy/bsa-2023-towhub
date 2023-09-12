import { orderCreateRequestBody } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onLocationChange:
    | ((place: { lat: number | undefined; lng: number | undefined }) => void)
    | undefined;
  onDestinationChange:
    | ((place: { lat: number | undefined; lng: number | undefined }) => void)
    | undefined;
};

const OrderForm: React.FC<Properties> = ({
  onSubmit,
  onLocationChange,
  onDestinationChange,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Please fill the form</p>
      <Form
        validationSchema={orderCreateRequestBody}
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
      />
    </div>
  );
};

export { OrderForm };
