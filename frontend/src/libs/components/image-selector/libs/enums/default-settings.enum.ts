import { type OutputFormat, type ViewMode } from '../types/types.js';

const DefaultSettings = {
  VIEW_MODE: 'square' satisfies ViewMode as ViewMode,
  INITIAL_ZOOM: 0.8,
  MODAL_SIZE: 400,
  OUTPUT_FORMAT: 'png' satisfies OutputFormat,
} as const;

export { DefaultSettings };
