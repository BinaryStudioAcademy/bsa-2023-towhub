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
      <CheckoutForm />
      {isCancel}
      {isSuccess}
    </div>
  );
};

export { CheckoutPage };
