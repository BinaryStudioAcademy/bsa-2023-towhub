import { DEFAULT_NOTIFICATION_OPTIONS } from './libs/options/notification.options.default.js';
import { NotificationService } from './notification-api.js';

const notification = new NotificationService(DEFAULT_NOTIFICATION_OPTIONS);

export { notification };
