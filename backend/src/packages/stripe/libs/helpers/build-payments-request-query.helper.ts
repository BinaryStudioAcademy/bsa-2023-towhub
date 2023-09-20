import { type Stripe } from 'stripe';

import { type ValueOf } from '~/libs/types/types.js';

import { type GetPaymentsRequest } from '../types/types.js';
import { convertDateToUnixSeconds } from './convert-date-to-unix-seconds.helper.js';
import { SUCCEEDED_STATUS } from './libs/consts/succeeded-status.const.js';
import { QueryToken } from './libs/enums/enums.js';
import { QueryTag } from './libs/enums/query-tag.enum.js';

const quoteAndSanitize = (value: unknown): string => {
  const sanitizedValue = String(value).replace(/["\\]/g, '');

  return `"${sanitizedValue}"`;
};

const binaryOperator = (
  key: string,
  token: ValueOf<typeof QueryToken>,
  value: unknown,
): string => {
  return key + token + quoteAndSanitize(value);
};

const keyOfObject = (objectName: string, keyName: string): string => {
  return `${objectName}["${keyName}"]`;
};

const addMetadataTag = (
  query: string[],
  options: GetPaymentsRequest,
  key: keyof GetPaymentsRequest,
): void => {
  if (!(key in options)) {
    return;
  }
  query.push(
    binaryOperator(
      keyOfObject(QueryTag.METADATA, key),
      QueryToken.EQ,
      options[key],
    ),
  );
};

const buildPaymetnsRequestQuery = (
  options: GetPaymentsRequest,
): Stripe.PaymentIntentSearchParams => {
  const query: string[] = [];

  query.push(binaryOperator(QueryTag.STATUS, QueryToken.EQ, SUCCEEDED_STATUS));

  addMetadataTag(query, options, 'businessId');
  addMetadataTag(query, options, 'orderId');
  addMetadataTag(query, options, 'userId');
  addMetadataTag(query, options, 'customerName');
  addMetadataTag(query, options, 'customerPhone');

  if (options.intervalFrom) {
    const value = convertDateToUnixSeconds(options.intervalFrom);
    query.push(binaryOperator(QueryTag.CREATED, QueryToken.GTE, value));
  }

  if (options.intervalTo) {
    const value = convertDateToUnixSeconds(options.intervalTo);
    query.push(binaryOperator(QueryTag.CREATED, QueryToken.LT, value));
  }

  const result: Stripe.PaymentIntentSearchParams = {
    query: query.join(QueryToken.AND),
  };

  return result;
};

export { buildPaymetnsRequestQuery };
