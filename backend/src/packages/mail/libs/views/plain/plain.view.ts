import path from 'node:path';
import url from 'node:url';

import { type IView, View } from '~/libs/packages/packages.js';

import { type TemplateNameValues } from '../../types/types.js';
import { type PlainViewRenderParameter } from './libs/types/types.js';

class PlainView extends View implements IView {
  public constructor(templateName: TemplateNameValues) {
    const templatePath = path.join(
      path.dirname(url.fileURLToPath(import.meta.url)),
      '..',
      'layouts',
      `${templateName}.hbs`,
    );
    super(templatePath);
  }

  public render(parameters: PlainViewRenderParameter): string {
    return this.compiledTemplate(parameters);
  }
}

export { PlainView };
