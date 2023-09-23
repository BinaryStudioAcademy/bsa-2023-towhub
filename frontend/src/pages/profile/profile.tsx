import { AuthMode } from '~/libs/enums/enums.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type BusinessEditDto,
  type CustomerEditDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { EditForm } from './components/edit-form/edit-form.js';
import styles from './styles.module.scss';

type Properties = {
  mode: ValueOf<typeof AuthMode>;
};

const Profile: React.FC<Properties> = ({ mode }: Properties) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (payload: CustomerEditDto | BusinessEditDto): void => {
      switch (mode) {
        case AuthMode.CUSTOMER: {
          void dispatch(authActions.editCustomer(payload));
          break;
        }
        case AuthMode.BUSINESS: {
          void dispatch(authActions.editBusiness(payload as BusinessEditDto));
          break;
        }
      }
    },
    [dispatch, mode],
  );

  return (
    <div className={styles.page}>
      <EditForm onSubmit={handleSubmit} mode={mode} />
    </div>
  );
};

export { Profile };
