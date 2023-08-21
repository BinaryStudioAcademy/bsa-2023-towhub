import { type ToastOptions, toast } from 'react-toastify';

import { NotificationTheme } from '../enums/notification.theme.enum.js';

const defaultNotificationOptions: ToastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: NotificationTheme.LIGHT,
};

export { defaultNotificationOptions };
