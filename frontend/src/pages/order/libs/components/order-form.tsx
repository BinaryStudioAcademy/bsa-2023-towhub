import { Form } from '~/libs/components/components.js';
import { orderCreateRequestBody } from '~/packages/orders/orders.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { CREATE_ORDER_DEFAULT_PAYLOAD } from './libs/constants.js';
import { orderFormFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  isDisabled?: boolean;
  price: number;
  // TODO: Change driverId to truckId
  driverId: number;
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onLocationChange: (place: google.maps.LatLngLiteral, address: string) => void;
  onDestinationChange: (
    place: google.maps.LatLngLiteral,
    address: string,
  ) => void;
};

const OrderForm: React.FC<Properties> = ({
  isDisabled,
  price,
  // TODO: Change driverId to truckId
  driverId,
  onSubmit,
  onLocationChange,
  onDestinationChange,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>PLEASE FILL THE FORM</p>
      <Form
        validationSchema={orderCreateRequestBody}
        fields={orderFormFields}
        // TODO: Change driverId to truckId
        defaultValues={{ ...CREATE_ORDER_DEFAULT_PAYLOAD, driverId }}
        onSubmit={onSubmit}
        onLocationChange={onLocationChange}
        onDestinationChange={onDestinationChange}
        isDisabled={isDisabled}
        btnLabel="ORDER"
        price={price}
      />
    </div>
  );
};

export { OrderForm };
