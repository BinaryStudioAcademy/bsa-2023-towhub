import { type OutputFormatT, type ViewModeT } from './types.js';

type ImageSelectorSettings = {
  VIEW_MODE: ViewModeT;
  INITIAL_ZOOM: number;
  MODAL_SIZE: number;
  OUTPUT_FORMAT: OutputFormatT;
};

export { type ImageSelectorSettings };
