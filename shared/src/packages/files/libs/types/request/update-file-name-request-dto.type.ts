import { type FileEntityT } from '../file-entity.type.js';

type UpdateFileNameRequestDto = Pick<FileEntityT, 'key'>;

export { type UpdateFileNameRequestDto };
