import { Button, ImageSelector } from '~/libs/components/components.js';
import { ImgPath } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useMemo,
  useRef,
} from '~/libs/hooks/hooks.js';
import { useAuthUser } from '~/slices/auth/auth.js';
import { uploadAvatar } from '~/slices/files/actions.js';

import { type EditAvatarFormData } from './libs/types/types.js';
import styles from './styles.module.scss';

const AVATAR_SIZE = 200;

const EditAvatarForm: React.FC = () => {
  const { handleSubmit, setValue, register, formState } =
    useAppForm<EditAvatarFormData>({
      defaultValues: { avatar: undefined },
    });
  const { isDirty } = formState;

  const user = useAuthUser();
  const dispatch = useAppDispatch();

  const inputReference = useRef<React.ElementRef<'input'>>(null);

  const avatarUrl = useMemo(() => {
    if (user && 'driver' in user) {
      return user.driver.avatarUrl;
    }
  }, [user]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((payload) => {
        const [file] = payload.avatar;
        file.type;

        void dispatch(uploadAvatar(file));
      })(event_);
    },
    [dispatch, handleSubmit],
  );

  const handleImageSelect = useCallback(() => {
    if (inputReference.current) {
      inputReference.current.click();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
          <div className="App">
            <ImageSelector
              setValue={setValue}
              register={register}
              inputReference={inputReference}
              name="avatar"
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              viewMode="circle"
              initialImageUrl={avatarUrl ?? ImgPath.AVATAR_DEFAULT}
              resultOptions={{ circle: true }}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              label={'Update file'}
              type="button"
              onClick={handleImageSelect}
              variant="outlined"
              isFullWidth
              className={getValidClassNames(styles.button, styles.outlined)}
            />
            <Button
              label={'Save'}
              type="submit"
              className={getValidClassNames(styles.button, styles.contained)}
              isDisabled={!isDirty}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditAvatarForm };
