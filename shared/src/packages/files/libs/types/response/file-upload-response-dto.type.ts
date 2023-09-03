import { type FileEntityT } from '../file-entity.type.js';

type FileUploadResponseDto = {
  items: FileEntityT[];
  totalCount: number;
};

export { type FileUploadResponseDto };
