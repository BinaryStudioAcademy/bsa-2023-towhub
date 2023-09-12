import { type Transporter, createTransport } from 'nodemailer';
import { type Options } from 'nodemailer/lib/mailer';

import { MailerConnectionError } from '~/libs/exceptions/exceptions.js';

import { type IConfig } from '../config/config.js';
import { type ILogger } from '../logger/logger.js';

type Constructor = {
  config: IConfig;
  logger: ILogger;
};

class Mailer {
  private connection: Transporter | undefined;

  private appConfig: IConfig;

  private logger: ILogger;

  public constructor({ config, logger }: Constructor) {
    this.appConfig = config;
    this.logger = logger;
  }

  public transporter(): Transporter {
    if (!this.connection) {
      throw new MailerConnectionError({
        message: 'Mailer: SMTP connection not established.',
      });
    }

    return this.connection;
  }

  public async send(options: Omit<Options, 'from'>): Promise<void> {
    await this.connection?.sendMail(options);
  }

  public async connect(): Promise<void> {
    this.connection = createTransport(
      {
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
          user: this.appConfig.ENV.MAILER.SENDGRID_USER,
          pass: this.appConfig.ENV.MAILER.SENDGRID_API_KEY,
        },
      },
      {
        from: this.appConfig.ENV.MAILER.SENDGRID_SENDER_EMAIL,
      },
    );

    try {
      await this.connection.verify();
      this.logger.info('SMTP connection successfully established.');
    } catch {
      throw new MailerConnectionError({
        message: 'Mailer: SMTP connection not established.',
      });
    }
  }

  public disconnect(): void {
    if (!this.connection) {
      return;
    }
    this.connection.close();

    this.logger.info('SMTP connection successfully closed.');
  }
}

export { Mailer };
