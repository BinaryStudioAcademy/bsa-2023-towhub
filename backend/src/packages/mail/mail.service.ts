import { type Mailer } from '~/libs/packages/mailer/mailer.package';

import { type MailSendRequestDto } from './libs/types/types.js';

class MailService {
  private mailer: Mailer;

  public constructor(mailer: Mailer) {
    this.mailer = mailer;
  }

  public async send(dto: MailSendRequestDto): Promise<void> {
    await this.mailer.transporter().sendMail(dto);
  }
}

export { MailService };
