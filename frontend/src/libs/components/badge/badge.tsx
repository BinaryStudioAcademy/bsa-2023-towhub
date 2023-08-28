import { getValidClassNames } from '~/libs/helpers/helpers.js';

import darkColors from './dark-colors.module.scss';
import lightColors from './light-colors.module.scss';
import styles from './styles.module.scss';
import { type DarkColor, type LightColor } from './types/color.type.js';

type Color = DarkColor | LightColor;

const paletteColors = {
  ...(darkColors as { [K in DarkColor]: string }),
  ...(lightColors as { [K in LightColor]: string }),
};
const [defaultColor] = Object.keys(paletteColors) as Color[];

type Properties = {
  children: string;
  className?: string;
  color?: Color;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Badge: React.FC<Properties> = ({
  children,
  className,
  color = defaultColor,
  onClick: handleClick,
}: Properties): JSX.Element => {
  const isEvent = Boolean(handleClick);
  const isColorInPalette = Boolean(paletteColors[color]);
  const backgroundColor = isColorInPalette ? color : defaultColor;
  const isBackgroundDark = Boolean(darkColors[backgroundColor]);
  const isClassName = Boolean(className);
  const badgeStyles = [
    styles.badge,
    `background-${backgroundColor}`,
    isBackgroundDark ? styles.textColorLight : styles.textColorDark,
    isEvent && styles.pointer,
    isClassName && className,
  ];

  return (
    <button className={getValidClassNames(badgeStyles)} onClick={handleClick}>
      {children}
    </button>
  );
};

export { Badge };
