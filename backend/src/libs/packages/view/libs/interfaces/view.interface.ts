import { type RenderParameter } from '~/packages/mail/libs/types/render-parameter.type.js';

interface IView {
  render(parameters: RenderParameter): string;
}

export { type IView };
