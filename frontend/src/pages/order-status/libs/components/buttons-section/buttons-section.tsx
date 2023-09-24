import { Button } from '~/libs/components/components.js';

import { OrderStatus } from '../../enums/order-status.enum.js';
import { type OrderStatusValues } from '../types/types.js';
import styles from './styles.module.scss';

type Properties = {
  status: OrderStatusValues;
  onCancelClick: () => void;
  onPayClick: () => void;
  onHomepageClick: () => void;
};
const ButtonsSection = ({
  onCancelClick,
  onPayClick,
  onHomepageClick,
  status,
}: Properties): JSX.Element => {
  const isDeclineButtonShown =
    status === OrderStatus.PENDING || status === OrderStatus.CONFIRMED;
  const isPayNowButtonShown = status === OrderStatus.PICKING_UP;
  const isHomepageButtonShown =
    status === OrderStatus.CANCELED || status === OrderStatus.DONE;

  return (
    <section className={styles.buttonsSection}>
      {isDeclineButtonShown && (
        <Button
          label="DECLINE"
          className={styles.buttonDecline}
          size={'md'}
          onClick={onCancelClick}
        />
      )}
      {isPayNowButtonShown && (
        <Button
          label="PAY NOW"
          className={styles.buttonPayNow}
          size={'md'}
          onClick={onPayClick}
        />
      )}
      {isHomepageButtonShown && (
        <Button
          label="HOMEPAGE"
          className={styles.buttonHomepage}
          size={'md'}
          onClick={onHomepageClick}
        />
      )}
    </section>
  );
};

export { ButtonsSection };
