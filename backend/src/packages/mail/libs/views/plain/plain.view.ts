import { View } from '~/libs/packages/view/view.js';

class PlainView extends View {
  public constructor(path: string) {
    super(path);
  }

  public render(parameters: unknown): string {
    return this.compiledTemplate(parameters);
  }
}

export { PlainView };
