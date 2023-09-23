import {
  type MultipartFields,
  type MultipartFile,
  type MultipartValue,
} from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';

const parseFormDataFields = (
  request: FastifyRequest,
): Record<string, unknown> & { files: MultipartFile[] } => {
  const parsedBody = {} as Record<string, unknown> & { files: MultipartFile[] };
  for (const [fieldName, field] of Object.entries(
    request.body as MultipartFields,
  )) {
    if (!field) {
      continue;
    }

    if (Array.isArray(field) && field[0].type !== 'file') {
      parsedBody[fieldName] = (field as MultipartValue[]).map(
        (arrayElement) => arrayElement.value,
      );
    } else if (!Array.isArray(field) && field.type === 'file') {
      parsedBody[fieldName] = [field];
    } else {
      parsedBody[fieldName] = (field as MultipartValue).value;
    }
  }

  return parsedBody;
};

export { parseFormDataFields };
