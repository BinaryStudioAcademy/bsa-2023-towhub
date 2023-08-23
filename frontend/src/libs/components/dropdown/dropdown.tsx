import React from 'react';
import Select from 'react-select';

import styles from './styles.module.scss';

type Option = { name: string; value: string };

type Properties = {
  id: string;
  name: string;
  options: Option[];
};

const Dropdown/*: React.FC<Properties>*/ = (): JSX.Element => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    // <div className={styles.dropdown}>
    //   <div className={`${styles['select-wrapper']}`}>
    //     <select className={styles.select} name={name} id={id}>
    //       {options.map((option) => (
    //         <option key={option.value} value={option.value}>
    //           {option.name}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // </div>

    <Select
      options={options}
    />
  );
};

export { Dropdown };
