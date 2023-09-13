import { orderForm } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { CREATE_ORDER_DEFAULT_PAYLOAD } from './libs/constants.js';
import { OrderFormFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onLocationChange: ((place: google.maps.LatLngLiteral) => void) | undefined;
  onDestinationChange: ((place: google.maps.LatLngLiteral) => void) | undefined;
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
        validationSchema={orderForm}
        fields={OrderFormFields}
        defaultValues={CREATE_ORDER_DEFAULT_PAYLOAD}
        onSubmit={onSubmit}
        onLocationChange={onLocationChange}
        onDestinationChange={onDestinationChange}
      />
    </div>
  );
};

export { OrderForm };
