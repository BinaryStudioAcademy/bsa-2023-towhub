import { defaultNotificationOptions } from './libs/options/notification.options.default.js';
import { NotificationService } from './notification-api.js';

const notification = NotificationService.getInstance(
  defaultNotificationOptions,
);

export { notification };
