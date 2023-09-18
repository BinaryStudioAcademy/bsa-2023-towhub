import { Form } from '~/libs/components/components.js';
import { type LocationChangeHandler } from '~/libs/types/location-change-handler.type.js';
import { orderCreateRequestBody } from '~/packages/orders/orders.js';
import { type OrderCreateRequestDto } from '~/packages/orders/orders.js';

import { getOrderFormFields } from './libs/fields.js';
import { getCreateOrderDefaultPayload } from './libs/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  isDisabled?: boolean;
  truckId: number;
  children: JSX.Element;
  onSubmit: (payload: OrderCreateRequestDto) => void;
  onStartLocationChange: LocationChangeHandler;
  onEndLocationChange: LocationChangeHandler;
};
const OrderForm: React.FC<Properties> = ({
  isDisabled,
  truckId,
  children,
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
        defaultValues={getCreateOrderDefaultPayload(truckId)}
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        btnLabel="ORDER"
        additionalFields={children}
      />
    </div>
  );
};

export { OrderForm };
