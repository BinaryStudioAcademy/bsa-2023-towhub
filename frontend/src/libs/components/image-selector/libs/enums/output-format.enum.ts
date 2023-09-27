import { type OutputFormatT } from '../types/types.js';

const OutputFormat = {
  PNG: 'png',
  JPEG: 'jpeg',
  WEBP: 'webp',
} as const satisfies Record<string, OutputFormatT>;

export { OutputFormat };
