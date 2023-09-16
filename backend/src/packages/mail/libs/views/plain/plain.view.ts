import { type IView, View } from '~/libs/packages/packages.js';

import { type PlainViewRenderParameter } from './libs/types/types.js';

class PlainView extends View implements IView<PlainViewRenderParameter> {
  public constructor(path: string) {
    super(path);
  }

  public render(parameters: { body: string }): string {
    return this.compiledTemplate(parameters);
  }
}

export { PlainView };
