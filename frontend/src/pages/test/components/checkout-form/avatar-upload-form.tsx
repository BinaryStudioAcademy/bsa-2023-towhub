import { Button, ImageSelector } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppForm,
  // useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
// import { selectUser } from '~/slices/auth/selectors.js';
import { uploadAvatar } from '~/slices/files/actions.js';

import { type AvatarUploadFormData } from './libs/types/types.js';
import styles from './styles.module.scss';

const AvatarUploadForm: React.FC = () => {
  const { handleSubmit, setValue } = useAppForm<AvatarUploadFormData>({
    defaultValues: { avatar: undefined, test: 0 },
  });

  // const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((payload) => {
        const [file] = payload.avatar;
        file.type;

        void dispatch(uploadAvatar(file)).then(() => {
          // console.log('done', result);
        });
      })(event_);
    },
    [dispatch, handleSubmit],
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Upload avatar</h3>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
          <div className="App">
            <ImageSelector
              setValue={setValue}
              name="avatar"
              width={250}
              height={250}
              viewMode="circle"
              initialImageUrl="https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
              resultOptions={{}}
            />
          </div>
          <Button label={'Submit'} type="submit" />
        </form>
      </div>
    </div>
  );
};

export { AvatarUploadForm };
