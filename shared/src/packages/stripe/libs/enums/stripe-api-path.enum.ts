const StripeApiPath = {
  ROOT: '/',
  GENERATE_EXPRESS_ACCOUNT_LINK: '/generate-link',
  WEBHOOK: '/webhook',
  GENERATE_CHECKOUT_LINK: '/generate-checkout-link',
} as const;

export { StripeApiPath };
