import { type IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import darkColors from '~/libs/palette/dark-colors.module.scss';
import lightColors from '~/libs/palette/light-colors.module.scss';
import {
  type DarkColor,
  type LightColor,
  type ValueOf,
} from '~/libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Color = DarkColor | LightColor;

const DEFAULT_COLOR = 'red';

const paletteColors = {
  ...(darkColors as { [K in DarkColor]: string }),
  ...(lightColors as { [K in LightColor]: string }),
};

type Properties = {
  className?: Parameters<typeof getValidClassNames>[0];
  label: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  variant?: 'contained' | 'outlined' | 'text';
  isDisabled?: boolean;
  background?: Color;
  isFullWidth?: boolean;
  frontIcon?: ValueOf<typeof IconName>;
  backIcon?: ValueOf<typeof IconName>;
  children?: JSX.Element;
  onClick?: (() => void) | ((event_: React.MouseEvent) => void);
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
  background = DEFAULT_COLOR,
  backIcon,
  children,
  onClick,
}: Properties) => {
  const backgroundColor = paletteColors[background]
    ? background
    : DEFAULT_COLOR;

  return (
    <button
      className={getValidClassNames(
        'uppercase',
        styles.btn,
        styles[size],
        styles[variant],
        isFullWidth && styles.fullWidth,
        `background-${backgroundColor}`,
        className,
      )}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {frontIcon && <Icon iconName={frontIcon} />}
      {label}
      {backIcon && <Icon iconName={backIcon} />}
      {children}
    </button>
  );
};

export { Button };
