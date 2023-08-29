import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  className?: string;
  src: string;
  alt: string;
};

const Image: React.FC<Properties> = ({ className, src, alt }: Properties) => {
  return (
    <img
      src={src}
      alt={alt}
      className={getValidClassNames(className, styles.image)}
    />
  );
};

export { Image };
