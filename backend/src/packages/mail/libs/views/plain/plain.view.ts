import { type IView, View } from '~/libs/packages/packages.js';

class PlainView extends View implements IView {
  public constructor(path: string) {
    super(path);
  }

  public render(parameters: unknown): string {
    return this.compiledTemplate(parameters);
  }
}

export { PlainView };
