import logoBrand from '~/assets/img/logo-brand.svg';
import logoSymbol from '~/assets/img/logo-symbol.svg';

import styles from './app-logo.module.scss';

type AppLogoProperties = {
  layout?: 'horizontal' | 'vertical';
};

const AppLogo: React.FC<AppLogoProperties> = ({
  layout = 'horizontal',
}: AppLogoProperties) => {
  return (
    <div className={[styles.container, styles[layout]].join(' ')}>
      <img src={logoSymbol} className={styles.logoSymbol} alt="logo" />
      <img src={logoBrand} className={styles.logoBrand} alt="brand" />
    </div>
  );
};

export { AppLogo };
