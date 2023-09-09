import { Link } from 'react-router-dom';

import { Button, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';

import { type SetupPaymentFormData } from './libs/types/types.js';
import { connectStripeValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const ConnectStripeForm: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const { control, errors, handleSubmit } = useAppForm<SetupPaymentFormData>({
    defaultValues: { stripeKey: '' },
    validationSchema: connectStripeValidationSchema,
  });

  const toggleMode = useCallback(() => {
    setShowInput((old) => !old);
  }, []);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(() => {
        return;
      })(event_);
    },
    [handleSubmit],
  );

  const handleRegisterStripeAccountPress = useCallback((): void => {
    return;
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Connect Your Stripe Account</h3>
      <div className={styles.contentWrapper}>
        <p className={styles.mainText}>
          To make the most of our application and enjoy its features, you will
          need to connect your Stripe account.
        </p>
        <p className={styles.mainText}>
          <Link
            className="link commonLink"
            to="https://stripe.com/"
            target="_blank"
          >
            Stripe
          </Link>{' '}
          is a secure and trusted payment platform that allows you to send and
          receive payments effortlessly.
        </p>
        {showInput ? (
          <>
            <form
              onSubmit={handleFormSubmit}
              className={styles.form}
              noValidate
            >
              <Input
                label="Stripe account key"
                name="stripeKey"
                control={control}
                errors={errors}
              />
              <Button type="submit" label="Continue" />
            </form>
            <div className={getValidClassNames('textSm', styles.smallText)}>
              Don&apos;t have a Stripe account?{' '}
              <button
                className={getValidClassNames('link', styles.toggleButton)}
                onClick={toggleMode}
              >
                Create it
              </button>
            </div>
          </>
        ) : (
          <>
            <Button
              label="Register stripe account"
              onClick={handleRegisterStripeAccountPress}
            />
            <div className="textSm">
              Already have a Stripe account?{' '}
              <button
                className={getValidClassNames('link', styles.toggleButton)}
                onClick={toggleMode}
              >
                Connect it here
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { ConnectStripeForm };
