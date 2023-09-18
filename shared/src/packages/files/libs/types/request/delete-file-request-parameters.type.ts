import { type FileEntityT } from '../file-entity.type.js';

type DeleteFileRequestParameters = Pick<FileEntityT, 'id'>;

export { type DeleteFileRequestParameters };
