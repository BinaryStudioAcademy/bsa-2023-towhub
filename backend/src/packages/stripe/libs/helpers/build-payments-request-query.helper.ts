import { type Stripe } from 'stripe';

import { type BusinessEntityT } from '~/packages/business/business.js';

import { type GetPaymentsRequest } from '../types/types.js';
import { convertDateToUnixSeconds } from './convert-date-to-unix-seconds.helper.js';
import { AND_OPERATOR_DELIMITER } from './libs/consts/and-operator-delimiter.const.js';
import { SUCCEEDED_STATUS } from './libs/consts/succeeded-status.const.js';
// 'status:\'succeeded\' AND metadata[\'order_id\']:\'6735\''

/*
amount	amount>1000	numeric
created	created>1620310503	numeric
currency	currency:"usd"	token
customer	customer:"cus_123"	token
metadata	metadata["key"]:"value"	token
status	status:"succeeded"	token
*/
const buildPaymetnsRequestQuery = (
  businessId: BusinessEntityT['id'],
  options: GetPaymentsRequest,
): Stripe.PaymentIntentSearchParams => {
  const query: string[] = [];

  query.push(
    `status:"${SUCCEEDED_STATUS}"`,
    `metadata["businessId"]:"${businessId}"`,
  );

  if (options.intervalFrom) {
    query.push(`created>${convertDateToUnixSeconds(options.intervalFrom)}`);
  }

  if (options.intervalTo) {
    query.push(`created<=${convertDateToUnixSeconds(options.intervalTo)}`);
  }

  if (options.orderId) {
    query.push(`metadata["orderId"]:"${options.orderId}"`);
  }

  if (options.userId) {
    query.push(`metadata["userId"]:"${options.userId}"`);
  }

  if (options.customerName) {
    query.push(`metadata["customerName"]:"${options.customerName}"`);
  }

  if (options.customerPhone) {
    query.push(`metadata["customerPhone"]:"${options.customerPhone}"`);
  }

  const result: Stripe.PaymentIntentSearchParams = {
    query: query.join(AND_OPERATOR_DELIMITER),
  };

  return result;
};

export { buildPaymetnsRequestQuery };
