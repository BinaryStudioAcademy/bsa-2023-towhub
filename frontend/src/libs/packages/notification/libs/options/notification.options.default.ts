import { type ToastOptions, toast } from 'react-toastify';

import { theme } from '../enums/notification.theme.enum.js';

const DEFAULT_NOTIFICATION_OPTIONS: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  theme: theme.LIGHT,
};

export { DEFAULT_NOTIFICATION_OPTIONS };
