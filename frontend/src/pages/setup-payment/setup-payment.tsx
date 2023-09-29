import { ConnectStripeForm } from './components/components.js';
import styles from './styles.module.scss';

const SetupPayment: React.FC = () => {
  return (
    <div className={styles.page}>
      <ConnectStripeForm />
    </div>
  );
};

export { SetupPayment };
