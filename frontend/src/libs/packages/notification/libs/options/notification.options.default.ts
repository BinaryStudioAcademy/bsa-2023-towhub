import {
  type ToastPosition,
  type ToastTransition,
  toast,
} from 'react-toastify';

import { NotificationTheme, NotificationTransition } from '../enums/enums.js';

type IToastOptions = {
  position?: ToastPosition;
  theme?: (typeof NotificationTheme)[keyof typeof NotificationTheme];
  autoClose?: number;
  transition?: ToastTransition;
};

const DEFAULT_NOTIFICATION_OPTIONS: IToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  theme: NotificationTheme.LIGHT,
  autoClose: 4000,
  transition: NotificationTransition.SLIDE,
};

export { type IToastOptions, DEFAULT_NOTIFICATION_OPTIONS };
