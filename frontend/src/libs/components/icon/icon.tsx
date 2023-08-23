import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type IconName, type IconSize } from '~/libs/enums/enums.js';

import { iconNameToSvg } from './icon.mapper.js';

type Properties = {
  iconName: (typeof IconName)[keyof typeof IconName];
  className?: string;
  size?: (typeof IconSize)[keyof typeof IconSize];
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
