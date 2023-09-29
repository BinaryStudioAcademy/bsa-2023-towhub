import { Button, Icon } from '~/libs/components/components.js';
import { DataStatus, IconName } from '~/libs/enums/enums.js';
import { useAppSelector, useQueryParameters } from '~/libs/hooks/hooks.js';
import { selectStripeDataStatus } from '~/slices/stripe/selectors.js';

import { OrderStatus, StripeOperationStatus } from '../../enums/enums.js';
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
    status === OrderStatus.CANCELED ||
    status === OrderStatus.DONE ||
    status === OrderStatus.REJECTED;

  const stripeDataStatus = useAppSelector(selectStripeDataStatus);
  const isFetching =
    stripeDataStatus === DataStatus.PENDING ||
    stripeDataStatus === DataStatus.FULFILLED;

  const { getQueryParameters } = useQueryParameters();
  const isPaymentSuccess = Boolean(
    getQueryParameters(StripeOperationStatus.SUCCESS),
  );

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
          label=""
          isDisabled={isFetching || isPaymentSuccess}
          className={styles.buttonPayNow}
          size={'md'}
          onClick={onPayClick}
        >
          <>
            {isFetching && (
              <Icon iconName={IconName.SYNC} className="fa-spin" />
            )}
            PAY NOW
          </>
        </Button>
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
