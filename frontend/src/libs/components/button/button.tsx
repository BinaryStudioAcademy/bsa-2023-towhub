import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  variant?: 'contained' | 'outlined' | 'text';
  isDisabled?: boolean;
  frontIcon?: ValueOf<typeof IconName>;
  backIcon?: ValueOf<typeof IconName>;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  size = 'md',
  variant = 'contained',
  label,
  isDisabled = false,
  frontIcon,
  backIcon,
  onClick,
}: Properties) => (
  <button
    className={getValidClassNames(styles.btn, styles[size], styles[variant])}
    type={type}
    disabled={isDisabled}
    onClick={onClick}
  >
    {frontIcon && <Icon iconName={frontIcon} />}
    {label}
    {backIcon && <Icon iconName={backIcon} />}
  </button>
);

export { Button };
