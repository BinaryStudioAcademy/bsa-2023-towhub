import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
import {
  type BusinessEditDto,
  type CustomerEditDto,
} from '~/packages/users/users.js';
import {
  actions as authActions,
  useAuthServerError,
  useAuthUser,
} from '~/slices/auth/auth.js';

import { EditForm } from './components/edit-form/edit-form.js';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAuthUser();
  const serverError = useAuthServerError();

  const handleSubmit = useCallback(
    (payload: CustomerEditDto | BusinessEditDto): void => {
      switch (user?.group.key) {
        case UserGroupKey.CUSTOMER: {
          void dispatch(authActions.editCustomer(payload));
          break;
        }
        case UserGroupKey.BUSINESS: {
          void dispatch(authActions.editBusiness(payload as BusinessEditDto));
          break;
        }
      }
    },
    [dispatch, user],
  );

  return (
    <div className={styles.page}>
      <EditForm onSubmit={handleSubmit} serverError={serverError} />
    </div>
  );
};

export { Profile };
