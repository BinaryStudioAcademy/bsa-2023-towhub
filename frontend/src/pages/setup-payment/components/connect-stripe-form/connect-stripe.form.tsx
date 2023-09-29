import { Link, Navigate } from 'react-router-dom';
import { type UserEntityObjectWithGroupAndBusinessT } from 'shared/build/index.js';

import { Button, Icon, Input } from '~/libs/components/components.js';
import { AppRoute, DataStatus, IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useQueryParameters,
  useState,
} from '~/libs/hooks/hooks.js';
import { useAuthUser } from '~/slices/auth/auth.js';
import {
  generateExpressAccountLink,
  selectExpressAccountLink,
  selectStripeDataStatus,
} from '~/slices/stripe/stripe.js';

import { STRIPE_URL } from './libs/constants/constants.js';
import { StripeOperationStatus } from './libs/enums/enums.js';
import { type SetupPaymentFormData } from './libs/types/types.js';
import { connectStripeValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const ConnectStripeForm: React.FC = () => {
  const { getQueryParameters } = useQueryParameters();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSuccessful = Boolean(
    getQueryParameters(StripeOperationStatus.SUCCESS),
  );

  const stripeDataStatus = useAppSelector(selectStripeDataStatus);
  const expressAccountLink = useAppSelector(selectExpressAccountLink);

  const user = useAuthUser<UserEntityObjectWithGroupAndBusinessT>();

  const isFetching =
    stripeDataStatus === DataStatus.PENDING ||
    stripeDataStatus === DataStatus.FULFILLED;

  const [showInput, setShowInput] = useState(false);
  const { control, errors, handleSubmit } = useAppForm<SetupPaymentFormData>({
    defaultValues: { stripeId: '' },
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

  const handleRegisterStripeAccountPress = useCallback(() => {
    if (isFetching) {
      return;
    }
    void dispatch(generateExpressAccountLink());
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (!expressAccountLink) {
      return;
    }
    window.location.href = expressAccountLink;
  }, [expressAccountLink]);

  useEffect(() => {
    if (isSuccessful) {
      navigate(AppRoute.DASHBOARD_ORDERS, { replace: true });
    }
  }, [navigate, isSuccessful]);

  if (user.business.isStripeActivated) {
    return <Navigate to={AppRoute.DASHBOARD_ORDERS} replace />;
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Connect Your Stripe Account</h3>
      <div className={styles.contentWrapper}>
        <p className={styles.mainText}>
          To make the most of our application and enjoy its features, you will
          need to connect your Stripe account.
        </p>
        <p className={styles.mainText}>
          <Link className="link commonLink" to={STRIPE_URL} target="_blank">
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
                name="stripeId"
                control={control}
                errors={errors}
              />
              <Button type="submit" label="" isDisabled={!isFetching}>
                <>
                  {isFetching && (
                    <Icon iconName={IconName.SYNC} className="fa-spin" />
                  )}
                  Submit
                </>
              </Button>
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
              label=""
              onClick={handleRegisterStripeAccountPress}
              isDisabled={isFetching}
            >
              <>
                {isFetching && (
                  <Icon iconName={IconName.SYNC} className="fa-spin" />
                )}
                Register stripe account
              </>
            </Button>
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
