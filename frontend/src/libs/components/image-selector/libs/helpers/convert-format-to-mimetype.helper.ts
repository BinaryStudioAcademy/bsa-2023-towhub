import { type OutputFormat } from '../types/types.js';

const convertFormatToMimetype = (
  format: OutputFormat,
): `image/${OutputFormat}` => {
  return `image/${format}`;
};

export { convertFormatToMimetype };
