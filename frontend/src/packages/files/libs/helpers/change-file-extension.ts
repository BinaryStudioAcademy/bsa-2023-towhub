import { FILE_EXTENSION_REGEX } from '../constants/constants.js';

const changeFileExtension = (
  filename: string,
  newExtension: string,
): string => {
  return filename.replace(FILE_EXTENSION_REGEX, `.${newExtension}`);
};

export { changeFileExtension };
