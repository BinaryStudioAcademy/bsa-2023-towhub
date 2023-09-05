import { getValidClassNames } from '~/libs/helpers/helpers.js';
import darkColors from '~/libs/palette/dark-colors.module.scss';
import lightColors from '~/libs/palette/light-colors.module.scss';
import { type DarkColor, type LightColor } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Color = DarkColor | LightColor;

const paletteColors = {
  ...(darkColors as { [K in DarkColor]: string }),
  ...(lightColors as { [K in LightColor]: string }),
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
  const hasEvent = Boolean(onClick);
  const backgroundColor = paletteColors[color] ? color : defaultColor;
  const isBackgroundDark = Boolean(darkColors[backgroundColor]);
  const hasClassName = Boolean(className);
  const badgeStyles = [
    styles.badge,
    `background-${backgroundColor}`,
    isBackgroundDark ? styles.textColorLight : styles.textColorDark,
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
