import { type AuthMode } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAuthNavigate,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type CustomerSignUpRequestDto } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { EditForm } from './edit-form/edit-form.js';
import styles from './styles.module.scss';

type Properties = {
  mode: ValueOf<typeof AuthMode>;
};

const Profile: React.FC<Properties> = ({ mode }: Properties) => {
  const dispatch = useAppDispatch();
  const { navigateAuthUser } = useAuthNavigate();

  const handleSubmit = useCallback(
    (payload: CustomerSignUpRequestDto): void => {
      void dispatch(authActions.signUp({ payload, mode }))
        .unwrap()
        .then((user) => {
          navigateAuthUser(user);
        });
    },
    [dispatch, mode, navigateAuthUser],
  );

  return (
    <div className={styles.page}>
      <EditForm onSubmit={handleSubmit} mode={mode} />
    </div>
  );
};

export { Profile };
