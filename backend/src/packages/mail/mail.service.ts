import { type Mailer } from '~/libs/packages/mailer/mailer.package';
import { type RequireProperty } from '~/libs/types/types.js';

import { type MailHeader, type TemplateNamesT } from './libs/types/types.js';
import { ViewsMapper } from './libs/views/views.js';

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
    viewName: TemplateNamesT,
    viewParameters: unknown,
  ): Promise<void> {
    const chosenView = ViewsMapper[viewName];
    await this.mailer
      .transporter()
      .sendMail({ ...header, html: chosenView.render(viewParameters) });
  }
}

export { MailService };
