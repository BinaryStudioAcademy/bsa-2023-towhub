import {
  type IconDefinition,
  faListUl,
  faTruckPickup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowDownLong,
  faCaretDown,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faCloudUploadAlt,
  faFile,
  faGear,
  faLocationDot,
  faMap,
  faPlus,
  faStar,
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
  [IconName.LOCATION_DOT]: faLocationDot,
  [IconName.MAP]: faMap,
  [IconName.CLOUD_UPLOAD]: faCloudUploadAlt,
  [IconName.FILE]: faFile,
  [IconName.CHECK]: faCheck,
  [IconName.LIST]: faListUl,
  [IconName.TRUCK]: faTruckPickup,
  [IconName.USERS]: faUsers,
};

export { iconNameToSvg };
