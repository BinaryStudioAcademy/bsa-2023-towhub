import styles from './spinner.module.scss';

type Properties = {
  isFullScreen?: boolean;
};

const Spinner: React.FC<Properties> = ({ isFullScreen }: Properties) => {
  if (isFullScreen) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export { Spinner };
