import darkColors from '~/libs/palette/dark-colors.module.scss';
import lightColors from '~/libs/palette/light-colors.module.scss';

const getTextColor = (color: string, styles: CSSModuleClasses): string[] => {
  if (darkColors[color]) {
    return [styles.textColorLight];
  }

  if (lightColors[color]) {
    return [styles.textColorDark];
  }

  return [styles[`color-${color}`]];
};

export { getTextColor };
