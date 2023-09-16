import { Form } from '~/libs/components/components.js';
import { orderCreateRequestBody } from '~/packages/orders/orders.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { CREATE_ORDER_DEFAULT_PAYLOAD } from './libs/constants.js';
import { getOrderFormFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  isDisabled?: boolean;
  price: number;
  truckId: number;
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onStartLocationChange: (
    place: google.maps.LatLngLiteral,
    address: string,
  ) => void;
  onEndLocationChange: (
    place: google.maps.LatLngLiteral,
    address: string,
  ) => void;
};
// TODO: Create separate order form component
const OrderForm: React.FC<Properties> = ({
  isDisabled,
  price,
  truckId,
  onSubmit,
  onStartLocationChange,
  onEndLocationChange,
}: Properties) => {
  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>PLEASE FILL THE FORM</p>
      <Form
        validationSchema={orderCreateRequestBody}
        fields={getOrderFormFields(onStartLocationChange, onEndLocationChange)}
        defaultValues={{ ...CREATE_ORDER_DEFAULT_PAYLOAD, truckId }}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        btnLabel="ORDER"
        price={price}
      />
    </div>
  );
};

export { OrderForm };
