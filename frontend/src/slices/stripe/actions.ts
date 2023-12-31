import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';

import {
  type GenerateCheckoutLinkRequest,
  type GetPaymentsResponse,
} from './libs/types/types.js';
import { name as sliceName } from './stripe.slice.js';

const generateExpressAccountLink = createAsyncThunk<
  string,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/generate-express-account-link`, async (_, { extra }) => {
  const { stripeApi, notification } = extra;

  try {
    return await stripeApi.generateExpressAccountLink();
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

const generateCheckoutLink = createAsyncThunk<
  string,
  GenerateCheckoutLinkRequest,
  AsyncThunkConfig
>(`${sliceName}/generate-checkout-link`, async (payload, { extra }) => {
  const { stripeApi, notification } = extra;

  try {
    return await stripeApi.generateCheckoutLink(payload);
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

const getPayments = createAsyncThunk<
  GetPaymentsResponse,
  string | undefined,
  AsyncThunkConfig<null>
>(`${sliceName}/get-payments`, async (query, { extra }) => {
  const { stripeApi, notification } = extra;

  try {
    return await stripeApi.getPayments(query);
  } catch (error) {
    notification.error(getErrorMessage(error));
    throw error;
  }
});

export { generateCheckoutLink, generateExpressAccountLink, getPayments };
