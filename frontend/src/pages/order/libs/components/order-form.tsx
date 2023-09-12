import { orderCreateRequestBody } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onLocationChange:
    | ((place: { lat: number | undefined; lng: number | undefined }) => void)
    | undefined;
  onDestinationChange:
    | ((place: { lat: number | undefined; lng: number | undefined }) => void)
    | undefined;
};

const OrderForm: React.FC<Properties> = ({
  onLocationChange,
  onDestinationChange,
}: Properties) => {
  const handleSubmit = useCallback(() => {
    return;
  }, []);

  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Please fill the form</p>
      <Form
        validationSchema={orderCreateRequestBody}
        fields={[
          { label: 'Name', name: 'name' },
          { label: 'Phone', name: 'phone' },
          { label: 'Time', name: 'time', type: 'date' },
          { label: 'Location', name: 'location', type: 'location' },
          { label: 'Destination', name: 'destination', type: 'location' },
          {
            label: 'How many cars need to be towed',
            name: 'cars',
            type: 'number',
          },
        ]}
        defaultValues={{
          name: '',
          phone: '',
          time: '',
          location: '',
          destination: '',
          cars: 1,
        }}
        onSubmit={handleSubmit}
        onLocationChange={onLocationChange}
        onDestinationChange={onDestinationChange}
      />
    </div>
  );
};

export { OrderForm };
