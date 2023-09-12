import { Button } from '~/libs/components/components.js';
import { useSearchParameters } from '~/libs/hooks/hooks.js';

import { CheckoutForm } from './components/checkout-form/checkout-form.js';
import { CheckoutSearchParameter } from './libs/enums/checkout-search-parameter.enum.js';
import styles from './styles.module.scss';

const CheckoutPage: React.FC = () => {
  const [searchParameters] = useSearchParameters();
  const isCancel = searchParameters.get(CheckoutSearchParameter.CANCEL);
  const isSuccess = searchParameters.get(CheckoutSearchParameter.SUCCESS);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <CheckoutForm />
        <div className={styles.secondary}>
          <Button label="request data" />
          <div>Cancelled: {isCancel}</div>
          <div>Successfull: {isSuccess}</div>
        </div>
      </div>
    </div>
  );
};

export { CheckoutPage };
