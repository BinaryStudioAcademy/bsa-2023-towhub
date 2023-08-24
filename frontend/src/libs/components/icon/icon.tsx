import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type IconName, type IconSize } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { iconNameToSvg } from './maps/maps.js';

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
