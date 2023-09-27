import { EditAvatarForm } from './components/edit-avatar-form/edit-avatar-form.js';
import styles from './styles.module.scss';

const EditDriverProfilePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <EditAvatarForm />
    </div>
  );
};

export { EditDriverProfilePage };
