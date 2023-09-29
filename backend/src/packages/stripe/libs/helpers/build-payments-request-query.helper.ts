import { type Stripe } from 'stripe';

import { type ValueOf } from '~/libs/types/types.js';

import { type GetPaymentsRequest } from '../types/types.js';
import { convertDateToUnixSeconds } from './convert-date-to-unix-seconds.helper.js';
import { SUCCEEDED_STATUS } from './libs/constants/constants.js';
import { QueryTag, QueryToken } from './libs/enums/enums.js';

const quoteAndSanitize = (value: unknown): string => {
  const sanitizedValue = String(value).replace(/["\\]/g, '');

  return `"${sanitizedValue}"`;
};

const composeString = (
  key: string,
  token: ValueOf<typeof QueryToken>,
  value: unknown,
): string => {
  return key + token + quoteAndSanitize(value);
};

const composeKeyOfObject = (objectName: string, keyName: string): string => {
  return `${objectName}["${keyName}"]`;
};

const addMetadataTag = (
  queries: string[],
  options: GetPaymentsRequest,
  key: keyof GetPaymentsRequest,
): void => {
  if (!(key in options)) {
    return;
  }
  queries.push(
    composeString(
      composeKeyOfObject(QueryTag.METADATA, key),
      QueryToken.EQ,
      options[key],
    ),
  );
};

const buildPaymetnsRequestQuery = (
  options: GetPaymentsRequest,
): Stripe.PaymentIntentSearchParams => {
  const queries: string[] = [];

  queries.push(composeString(QueryTag.STATUS, QueryToken.EQ, SUCCEEDED_STATUS));

  for (const fields of [
    'businessId',
    'orderId',
    'userId',
    'customerName',
    'customerPhone',
  ] as const) {
    addMetadataTag(queries, options, fields);
  }

  if (options.intervalFrom) {
    const value = convertDateToUnixSeconds(options.intervalFrom);
    queries.push(composeString(QueryTag.CREATED, QueryToken.GTE, value));
  }

  if (options.intervalTo) {
    const value = convertDateToUnixSeconds(options.intervalTo);
    queries.push(composeString(QueryTag.CREATED, QueryToken.LT, value));
  }

  const result: Stripe.PaymentIntentSearchParams = {
    query: queries.join(QueryToken.AND),
  };

  return result;
};

export { buildPaymetnsRequestQuery };
