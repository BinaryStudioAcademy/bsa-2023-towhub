import { type Mailer } from '~/libs/packages/packages.js';
import { type RequireProperty } from '~/libs/types/types.js';

import { TemplateNameToView } from './libs/maps/maps.js';
import {
  type MailHeader,
  type TemplateNameValues,
} from './libs/types/types.js';

class MailService {
  private mailer: Mailer;

  public constructor(mailer: Mailer) {
    this.mailer = mailer;
  }

  public async sendText(
    header: RequireProperty<MailHeader, 'text'>,
  ): Promise<void> {
    await this.mailer.transporter().sendMail({ ...header });
  }

  public async sendPage(
    header: MailHeader,
    viewName: TemplateNameValues,
    viewParameters: unknown,
  ): Promise<void> {
    const chosenView = TemplateNameToView[viewName];
    await this.mailer
      .transporter()
      .sendMail({ ...header, html: chosenView.render(viewParameters) });
  }
}

export { MailService };
