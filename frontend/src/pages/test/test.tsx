import { AvatarUploadForm } from './components/checkout-form/avatar-upload-form.js';
import styles from './styles.module.scss';

const TestPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <AvatarUploadForm />
      </div>
    </div>
  );
};

export { TestPage };
