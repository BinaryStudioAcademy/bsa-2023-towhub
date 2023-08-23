import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  variant?: 'contained' | 'outlined' | 'text';
  isDisabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  size = 'md',
  variant = 'contained',
  label,
  isDisabled = false,
  onClick,
}: Properties) => (
  <button
    className={getValidClassNames(styles.btn, styles[size], styles[variant])}
    type={type}
    disabled={isDisabled}
    onClick={onClick}
  >
    <Icon iconName={IconName.PLUS} />
    {label}
    <Icon iconName={IconName.CHEVRON_DOWN} />
  </button>
);

export { Button };
