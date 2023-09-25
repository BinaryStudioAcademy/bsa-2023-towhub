import { type CroppedImage } from './cropped-image.type.js';
import { type ResultOptions } from './result.options.type.js';

type HookReturnType = {
  getCroppedImage: (
    options?: ResultOptions,
  ) => Promise<CroppedImage | undefined>;
};

type HookProperties = {
  width: number;
  height: number;
  initialZoom: number;
  viewMode: Croppie.CropType;
  cropHolderReference: React.RefObject<HTMLDivElement>;
  imageAsDataUrl: string | null;
};

export { type HookProperties, type HookReturnType };
