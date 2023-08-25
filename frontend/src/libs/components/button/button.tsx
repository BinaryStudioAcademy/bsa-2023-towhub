import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  className?: Parameters<typeof getValidClassNames>[0];
  label: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  variant?: 'contained' | 'outlined' | 'text';
  isDisabled?: boolean;
  isFullWidth?: boolean;
  frontIcon?: ValueOf<typeof IconName>;
  backIcon?: ValueOf<typeof IconName>;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  className,
  type = 'button',
  size = 'md',
  variant = 'contained',
  label,
  isDisabled = false,
  isFullWidth = false,
  frontIcon,
  backIcon,
  onClick,
}: Properties) => {
  return (
    <button
      className={getValidClassNames(
        styles.btn,
        styles[size],
        styles[variant],
        isFullWidth ? styles.fullWidth : null,
        className,
      )}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {frontIcon && <Icon iconName={frontIcon} />}
      {label}
      {backIcon && <Icon iconName={backIcon} />}
    </button>
  );
};

export { Button };
