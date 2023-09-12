import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { stripeApi } from '~/packages/stripe/stripe.js';

import { type CheckoutFormData } from './libs/types/types.js';
import styles from './styles.module.scss';

const CheckoutForm: React.FC = () => {
  const { control, errors, handleSubmit } = useAppForm<CheckoutFormData>({
    defaultValues: { distance: 0, pricePerUnit: 10 },
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (payload) => {
        const url = await stripeApi.generateCheckoutLink(payload);
        window.location.href = url;
      })(event_);
    },
    [handleSubmit],
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
