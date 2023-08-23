import {
  type ToastPosition,
  type ToastTransition,
  toast,
} from 'react-toastify';

import { type ValueOf } from '~/libs/types/types.js';

import { NotificationTheme, NotificationTransition } from '../enums/enums.js';

type ToastOptions = {
  position?: ToastPosition;
  theme?: ValueOf<typeof NotificationTheme>;
  autoClose?: number;
  transition?: ToastTransition;
};

const DEFAULT_NOTIFICATION_OPTIONS: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  theme: NotificationTheme.LIGHT,
  autoClose: 4000,
  transition: NotificationTransition.SLIDE,
};

export { type ToastOptions, DEFAULT_NOTIFICATION_OPTIONS };
