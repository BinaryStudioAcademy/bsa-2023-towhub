import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ValueOf } from 'shared/build/index.js';

import { type IconName, type IconSize } from '~/libs/enums/enums.js';

import { iconNameToSvg } from './icon.mapper.js';

type Properties = {
  iconName: ValueOf<typeof IconName>;
  className?: string;
  size?: ValueOf<typeof IconSize>;
};

const Icon: React.FC<Properties> = ({
  iconName,
  className,
  size,
}: Properties) => (
  <FontAwesomeIcon
    className={className}
    icon={iconNameToSvg[iconName]}
    size={size}
  />
);

export { Icon };
