import { orderForm } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { CREATE_ORDER_DEFAULT_PAYLOAD } from './libs/constants.js';
import { orderFormFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  isDisabled?: boolean;
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onLocationChange: (place: google.maps.LatLngLiteral) => void;
  onDestinationChange: (place: google.maps.LatLngLiteral) => void;
};

const OrderForm: React.FC<Properties> = ({
  isDisabled,
  onSubmit,
  onLocationChange,
  onDestinationChange,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Please fill the form</p>
      <Form
        validationSchema={orderForm}
        fields={orderFormFields}
        defaultValues={CREATE_ORDER_DEFAULT_PAYLOAD}
        onSubmit={onSubmit}
        onLocationChange={onLocationChange}
        onDestinationChange={onDestinationChange}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export { OrderForm };
