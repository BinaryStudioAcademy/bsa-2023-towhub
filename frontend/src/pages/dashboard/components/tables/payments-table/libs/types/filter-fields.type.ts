import { type GetPaymentsRequest } from './types.js';

type FilterFields = Record<
  keyof Pick<
    GetPaymentsRequest,
    'size' | 'page' | 'intervalFrom' | 'intervalTo'
  >,
  string
>;

export { type FilterFields };
