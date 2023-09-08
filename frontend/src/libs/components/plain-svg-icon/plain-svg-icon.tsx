import { type PlainSvgIconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { iconNameToPlainSvg } from './maps/maps.js';

type Properties = {
  name: ValueOf<typeof PlainSvgIconName>;
};
const PlainSvgIcon: React.FC<Properties> = ({ name }: Properties) => (
  <>{iconNameToPlainSvg[name]}</>
);

export { PlainSvgIcon };
