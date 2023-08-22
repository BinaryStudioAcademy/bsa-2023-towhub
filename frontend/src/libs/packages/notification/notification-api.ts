import { toast } from 'react-toastify';

import { type IToastOptions } from './libs/options/notification.options.default.js';

class NotificationService {
  #options: IToastOptions;

  public constructor(options: IToastOptions) {
    this.#options = options;
  }

  public success(message: string, options?: IToastOptions): void {
    toast.success(message, {
      ...this.#options,
      ...options,
    });
  }

  public error(message: string, options?: IToastOptions): void {
    toast.error(message, {
      ...this.#options,
      ...options,
    });
  }

  public warning(message: string, options?: IToastOptions): void {
    toast.warn(message, { ...this.#options, ...options });
  }

  public info(message: string, options?: IToastOptions): void {
    toast.info(message, { ...this.#options, ...options });
  }
}

export { NotificationService };
