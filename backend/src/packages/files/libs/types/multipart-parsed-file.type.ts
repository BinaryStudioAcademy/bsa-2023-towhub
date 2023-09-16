import { type MultipartFile } from '@fastify/multipart';

type MultipartParsedFile = Pick<
  MultipartFile,
  'fieldname' | 'filename' | 'encoding' | 'mimetype'
> & { content: Buffer };

export { type MultipartParsedFile };
