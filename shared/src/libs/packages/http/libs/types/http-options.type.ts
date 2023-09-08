import { type HttpMethod } from '~/libs/packages/http/libs/enums/http-method.enum.js';
import { type ValueOf } from '~/libs/types/value-of.type.js';

type HttpOptions = {
  method: ValueOf<typeof HttpMethod>;
  payload: BodyInit | null;
  headers: Headers;
};

export { type HttpOptions };
