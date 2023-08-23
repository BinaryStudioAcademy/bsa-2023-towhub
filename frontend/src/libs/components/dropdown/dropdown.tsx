import styles from './styles.module.scss';

const Dropdown = (): JSX.Element => {
  return (
    <div className={styles.dropdown}>
      <span className={styles.title}>Dropdown title</span>
      <div className={styles['select-wrapper']}>
        <select className={styles.select} name="" id="">
          <option value="option">Option 1</option>
          <option value="option 2">Option 2</option>
        </select>
      </div>
    </div>
  );
};

export { Dropdown };
