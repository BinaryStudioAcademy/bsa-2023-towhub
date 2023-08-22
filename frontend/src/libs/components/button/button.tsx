import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './button.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  size = 'md',
  variant = 'contained',
  label,
  disabled = false,
}: Properties) => (
  <button
    className={[styles.btn, styles[size], styles[variant]].join(' ')}
    type={type}
    disabled={disabled}
  >
    <FontAwesomeIcon icon={faPlus} />
    {label}
    <FontAwesomeIcon icon={faChevronDown} />
  </button>
);

export { Button };
