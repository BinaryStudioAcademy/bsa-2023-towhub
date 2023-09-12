import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowDownLong,
  faCaretDown,
  faChevronDown,
  faChevronLeft,
  faEye,
  faGear,
  faListUl,
  faLocationDot,
  faMap,
  faPlus,
  faStar,
  faSync,
  faTruckPickup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { IconName } from '~/libs/enums/icon-name.enum.js';
import { type ValueOf } from '~/libs/types/types.js';

const iconNameToSvg: Record<ValueOf<typeof IconName>, IconDefinition> = {
  [IconName.ARROW_DOWN_LONG]: faArrowDownLong,
  [IconName.PLUS]: faPlus,
  [IconName.CARET_DOWN]: faCaretDown,
  [IconName.CHEVRON_DOWN]: faChevronDown,
  [IconName.CHEVRON_LEFT]: faChevronLeft,
  [IconName.GEAR]: faGear,
  [IconName.STAR]: faStar,
  [IconName.LIST]: faListUl,
  [IconName.LOCATION_DOT]: faLocationDot,
  [IconName.MAP]: faMap,
  [IconName.TRUCK]: faTruckPickup,
  [IconName.USERS]: faUsers,
  [IconName.EYE]: faEye,
  [IconName.SYNC]: faSync,
};

export { iconNameToSvg };
