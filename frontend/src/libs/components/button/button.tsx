import { IconName } from '~/libs/enums/icon-name.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

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
    className={getValidClassNames(styles.btn, styles[size], styles[variant])}
    type={type}
    disabled={disabled}
  >
    <Icon iconName={IconName.PLUS} />
    {label}
    <Icon iconName={IconName.CHEVRON_DOWN} />
  </button>
);

export { Button };
