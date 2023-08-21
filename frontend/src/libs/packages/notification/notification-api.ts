import { type ToastOptions, toast } from 'react-toastify';

class NotificationService {
  #options: ToastOptions;

  static #instance: NotificationService | undefined;

  private constructor(options: ToastOptions) {
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

  public static getInstance(options: ToastOptions): NotificationService {
    if (!this.#instance) {
      this.#instance = new NotificationService(options);
    }

    return this.#instance;
  }
}

export { NotificationService };
