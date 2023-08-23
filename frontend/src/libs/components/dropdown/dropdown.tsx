import React from 'react';

import styles from './styles.module.scss';

type Option = { name: string; value: string };

type Properties = {
  id: string;
  name: string;
  options: Option[];
};

const Dropdown: React.FC<Properties> = ({ id, name, options }): JSX.Element => {
  return (
    <div className={styles.dropdown}>
      <div className={`${styles['select-wrapper']}`}>
        <select className={styles.select} name={name} id={id}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { Dropdown };
