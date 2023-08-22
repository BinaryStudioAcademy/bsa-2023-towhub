import { type Theme, type ToastPosition, toast } from 'react-toastify';

import { theme } from '../enums/notification.theme.enum.js';

type IToastOptions = {
  position?: ToastPosition;
  theme?: Theme;
  autoClose?: number;
};

const DEFAULT_NOTIFICATION_OPTIONS: IToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  theme: theme.LIGHT,
  autoClose: 4000,
};

export { type IToastOptions, DEFAULT_NOTIFICATION_OPTIONS };
