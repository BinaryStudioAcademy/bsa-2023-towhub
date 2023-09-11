import { ReactComponent as ArrowDown } from '~/assets/img/order-card/arrow-down.svg';
import { ReactComponent as BlueCircle } from '~/assets/img/order-card/blue-circle.svg';
import { ReactComponent as HorizontalBar } from '~/assets/img/order-card/horizontal-bar.svg';
import { ReactComponent as LocationDot } from '~/assets/img/order-card/location-dot.svg';
import { ReactComponent as Map } from '~/assets/img/order-card/map.svg';
import { ReactComponent as RedCircle } from '~/assets/img/order-card/red-circle.svg';
import { PlainSvgIconName } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const iconNameToPlainSvg: Record<
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

export { iconNameToPlainSvg };
