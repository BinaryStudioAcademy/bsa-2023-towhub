import { Button } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  isDeclineButtonShown: boolean;
  isPayNowButtonShown: boolean;
  isHomepageButtonShown: boolean;
  onCancelClick: () => void;
  onPayClick: () => void;
  onHomepageClick: () => void;
};
const ButtonsSection = ({
  isDeclineButtonShown,
  isPayNowButtonShown,
  isHomepageButtonShown,
  onCancelClick,
  onPayClick,
  onHomepageClick,
}: Properties): JSX.Element => (
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

export { ButtonsSection };
