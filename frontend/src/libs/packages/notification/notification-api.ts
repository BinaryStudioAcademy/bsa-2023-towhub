import { toast } from 'react-toastify';

import { type ToastOptions } from './libs/options/notification.options.default.js';

class NotificationService {
  #options: ToastOptions;

  public constructor(options: ToastOptions) {
    this.#options = options;
  }

  public success(message: string, options?: ToastOptions): void {
    toast.success(message, {
      ...this.#options,
      ...options,
    });
  }

  public error(message: string, options?: ToastOptions): void {
    toast.error(message, {
      ...this.#options,
      ...options,
    });
  }

  public warning(message: string, options?: ToastOptions): void {
    toast.warn(message, { ...this.#options, ...options });
  }

  public info(message: string, options?: ToastOptions): void {
    toast.info(message, { ...this.#options, ...options });
  }
}

export { NotificationService };
