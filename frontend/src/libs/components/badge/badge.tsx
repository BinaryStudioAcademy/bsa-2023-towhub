import { getValidClassNames } from '~/libs/helpers/helpers.js';
import darkColors from '~/libs/palette/dark-colors.module.scss';
import lightColors from '~/libs/palette/light-colors.module.scss';
import paleColors from '~/libs/palette/pale-colors.module.scss';
import {
  type DarkColor,
  type LightColor,
  type PaleColor,
} from '~/libs/types/types.js';

import { getTextColor } from './libs/helpers/helpers.js';
import { type Color } from './libs/types/types.js';
import styles from './styles.module.scss';

const paletteColors = {
  ...(darkColors as { [K in DarkColor]: string }),
  ...(lightColors as { [K in LightColor]: string }),
  ...(paleColors as { [K in PaleColor]: string }),
};
const [defaultColor] = Object.keys(paletteColors) as Color[];

type Properties = {
  children: string | JSX.Element[];
  className?: string;
  color?: Color;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Badge: React.FC<Properties> = ({
  children,
  className,
  color = defaultColor,
  onClick,
}: Properties): JSX.Element => {
  let colorNormalized = color;

  if (color.split('-').length === 1) {
    colorNormalized = `${color}-normal` as Color;
  }

  const hasEvent = Boolean(onClick);
  const backgroundColor = paletteColors[color] ? colorNormalized : defaultColor;
  const hasClassName = Boolean(className);
  const badgeStyles = [
    styles.badge,
    `background-${backgroundColor}`,
    ...getTextColor(color, styles),
    hasEvent && styles.pointer,
    hasClassName && className,
  ];

  return (
    <button className={getValidClassNames(badgeStyles)} onClick={onClick}>
      {children}
    </button>
  );
};

export { Badge };
