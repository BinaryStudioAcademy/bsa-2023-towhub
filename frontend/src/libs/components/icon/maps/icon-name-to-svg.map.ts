import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowDownLong,
  faBars,
  faCaretDown,
  faChevronDown,
  faChevronLeft,
  faClockRotateLeft,
  faEye,
  faGear,
  faListUl,
  faLocationDot,
  faMap,
  faPlus,
  faRightFromBracket,
  faStar,
  faTruckPickup,
  faUserPen,
  faUsers,
  faXmark,
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
  [IconName.BARS]: faBars,
  [IconName.XMARK]: faXmark,
  [IconName.CLOCK_ROTATE_LEFT]: faClockRotateLeft,
  [IconName.USER_PEN]: faUserPen,
  [IconName.RIGHT_FROM_BRACKET]: faRightFromBracket,
  [IconName.TRUCK]: faTruckPickup,
  [IconName.USERS]: faUsers,
  [IconName.EYE]: faEye,
};

export { iconNameToSvg };
