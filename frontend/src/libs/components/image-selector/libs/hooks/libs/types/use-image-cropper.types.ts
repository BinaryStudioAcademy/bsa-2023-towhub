import { type ViewModeT } from '../../../types/types.js';
import { type CroppedImage } from './cropped-image.type.js';
import { type ResultOptions } from './result.options.type.js';

type HookReturnType = {
  getCroppedImage: (options?: ResultOptions) => Promise<CroppedImage | null>;
};

type HookProperties = {
  width: number;
  height: number;
  initialZoom: number;
  viewMode: ViewModeT;
  cropHolderReference: React.RefObject<HTMLDivElement>;
  imageUrl: string | null;
};

export { type HookProperties, type HookReturnType };
