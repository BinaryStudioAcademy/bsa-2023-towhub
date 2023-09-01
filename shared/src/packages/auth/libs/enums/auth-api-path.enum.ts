const AuthApiPath = {
  ROOT: '/',
  SIGN_UP_CUSTOMER: '/sign-up/customer',
  SIGN_UP_BUSINESS: '/sign-up/business',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up/:groupName',
} as const;

export { AuthApiPath };
