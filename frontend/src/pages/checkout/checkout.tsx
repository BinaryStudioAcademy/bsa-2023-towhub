import { Button } from '~/libs/components/components.js';
import {
  useAppSelector,
  useCallback,
  useSearchParameters,
} from '~/libs/hooks/hooks.js';
import { stripeApi } from '~/packages/stripe/stripe.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { CheckoutForm } from './components/checkout-form/checkout-form.js';
import { CheckoutSearchParameter } from './libs/enums/checkout-search-parameter.enum.js';
import styles from './styles.module.scss';

const CheckoutPage: React.FC = () => {
  const [searchParameters] = useSearchParameters();
  const isCancel = searchParameters.get(CheckoutSearchParameter.CANCEL);
  const isSuccess = searchParameters.get(CheckoutSearchParameter.SUCCESS);
  const user = useAppSelector(selectUser);

  const handleRequestData = useCallback((): void => {
    if (user && 'business' in user) {
      void stripeApi
        .getPayments({
          businessId: user.business.id,
        })
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data);
        });
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <CheckoutForm />
        <div className={styles.secondary}>
          <Button label="request data" onClick={handleRequestData} />
          <div>Cancelled: {isCancel}</div>
          <div>Successfull: {isSuccess}</div>
        </div>
      </div>
    </div>
  );
};

export { CheckoutPage };
