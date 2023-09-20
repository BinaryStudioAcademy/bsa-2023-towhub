import { type Mailer } from '~/libs/packages/packages.js';

import { templateNameToView } from './libs/maps/maps.js';
import {
  type RenderParameter,
  type SendPageMailHeader,
  type SendTextMailHeader,
  type TemplateNameValues,
} from './libs/types/types.js';

class MailService {
  private mailer: Mailer;

  public constructor(mailer: Mailer) {
    this.mailer = mailer;
  }

  public async sendText(header: SendTextMailHeader): Promise<void> {
    await this.mailer.transporter().sendMail({ ...header });
  }

  public async sendPage<T extends TemplateNameValues = TemplateNameValues>(
    header: SendPageMailHeader,
    viewName: T,
    viewParameters: RenderParameter,
  ): Promise<void> {
    const chosenView = templateNameToView[viewName];
    await this.mailer
      .transporter()
      .sendMail({ ...header, html: chosenView.render(viewParameters) });
  }
}

export { MailService };
