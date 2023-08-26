import { getValidClassNames } from '~/libs/helpers/helpers.js';

import darkColors from './dark-colors.module.scss';
import lightColors from './light-colors.module.scss';
import styles from './styles.module.scss';

const PaletteColors = [
  ...Object.keys(darkColors),
  ...Object.keys(lightColors),
] as const;

const defaultColor = 'green';

type Properties = {
  children: string;
  className?: string;
  color?: (typeof PaletteColors)[number];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Badge: React.FC<Properties> = ({
  children,
  className,
  color = defaultColor,
  onClick: handleClick,
}: Properties): JSX.Element => {
  const isEvent = Boolean(handleClick);
  const isColorInPalette = PaletteColors.includes(color);
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
