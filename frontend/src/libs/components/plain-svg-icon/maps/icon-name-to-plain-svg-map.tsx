import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { ReactComponent as ArrowDown } from './arrow-down.svg';
import { ReactComponent as BlueCircle } from './blue-circle.svg';
import { ReactComponent as HorizontalBar } from './horizontal-bar.svg';
import { ReactComponent as LocationDot } from './location-dot.svg';
import { ReactComponent as Map } from './map.svg';
import { ReactComponent as RedCircle } from './red-circle.svg';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof PlainSvgIconName>,
  JSX.Element
> = {
  [PlainSvgIconName.ARROW_DOWN]: <ArrowDown />,
  [PlainSvgIconName.BLUE_CIRCLE]: <BlueCircle />,
  [PlainSvgIconName.HORIZONTAL_BAR]: <HorizontalBar />,
  [PlainSvgIconName.LOCATION_DOT]: <LocationDot />,
  [PlainSvgIconName.MAP]: <Map />,
  [PlainSvgIconName.RED_CIRCLE]: <RedCircle />,
};

export { iconNameToPlainSvgMap };
