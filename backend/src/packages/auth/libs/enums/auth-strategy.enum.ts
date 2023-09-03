const AuthStrategy = {
  INJECT_USER: 'injectUser',
  VERIFY_JWT: 'verifyJWT',
  VERIFY_BUSINESS_GROUP: 'verifyBusinessGroup',
  VERIFY_DRIVER_GROUP: 'verifyDriverGroup',
} as const;

export { AuthStrategy };
