import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useAppSelector, useCallback } from '~/libs/hooks/hooks.js';
import { stripeApi } from '~/packages/stripe/stripe.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { type CheckoutFormData, type OrderEntity } from './libs/types/types.js';
import styles from './styles.module.scss';

const CheckoutForm: React.FC = () => {
  const { control, errors, handleSubmit } = useAppForm<CheckoutFormData>({
    defaultValues: { distance: 0, pricePerUnit: 10 },
  });

  const user = useAppSelector(selectUser);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (payload) => {
        const order: OrderEntity = {
          id: 321,
          price: payload.distance * payload.pricePerUnit,
          scheduledTime: '',
          carsQty: 1,
          startPoint: '',
          endPoint: '',
          status: 'pending',
          userId: user?.id ?? null,
          businessId: 4,
          customerName: 'Test user',
          customerPhone: '+380671111111',
          shiftId: 0,
          driver: {
            driverLicenseNumber: '',
            email: '',
            firstName: '',
            id: 123,
            lastName: '',
            phone: '',
          },
          truck: {
            id: 1,
            licensePlateNumber: '',
          },
        };

        const url = await stripeApi.generateCheckoutLink({
          order,
        });
        window.location.href = url;
      })(event_);
    },
    [handleSubmit, user?.id],
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Payment example</h3>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
          <Input
            label="Distance in km"
            name="distance"
            control={control}
            errors={errors}
          />
          <Input
            label="Price per km"
            name="pricePerUnit"
            control={control}
            errors={errors}
          />
          <Button type="submit" label="Continue" />
        </form>
      </div>
    </div>
  );
};

export { CheckoutForm };
