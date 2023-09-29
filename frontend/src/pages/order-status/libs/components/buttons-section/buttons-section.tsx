import { Button, Icon } from '~/libs/components/components.js';
import { DataStatus, IconName } from '~/libs/enums/enums.js';
import {
  useAppSelector,
  useEffect,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { UserNotificationMessage } from '~/packages/users/libs/enums/enums.js';
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
  const isPaymentAccepted =
    stripeDataStatus === DataStatus.PENDING ||
    stripeDataStatus === DataStatus.FULFILLED;

  const { getQueryParameters, removeQueryParameters } = useQueryParameters();
  const isPaymentSuccessful = Boolean(
    getQueryParameters(StripeOperationStatus.SUCCESS),
  );
  const isPaymentCancelled = Boolean(
    getQueryParameters(StripeOperationStatus.CANCEL),
  );

  useEffect(() => {
    if (isPaymentCancelled) {
      removeQueryParameters(StripeOperationStatus.CANCEL);
      notification.warning(UserNotificationMessage.CANCELLED_PAYMENT);
    }
  }, [isPaymentCancelled, removeQueryParameters]);

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
          isDisabled={isPaymentAccepted || isPaymentSuccessful}
          className={styles.buttonPayNow}
          size={'md'}
          onClick={onPayClick}
        >
          <>
            {isPaymentAccepted && (
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
