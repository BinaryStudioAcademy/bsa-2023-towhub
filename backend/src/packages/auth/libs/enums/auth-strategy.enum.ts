const AuthStrategy = {
  INJECT_USER: 'injectUser',
  VERIFY_JWT: 'verifyJWT',
  VERIFY_BUSINESS_GROUP: 'verifyBusinessGroup',
  VERIFY_DRIVER_GROUP: 'verifyDriverGroup',
  VERIFY_CUSTOMER_GROUP: 'verifyCustomerGroup',
} as const;

export { AuthStrategy };
