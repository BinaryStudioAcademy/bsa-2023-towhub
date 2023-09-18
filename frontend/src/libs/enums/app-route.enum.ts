const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ORDER_HISTORY: '/order-history',
  EDIT_CUSTOMER_PROFILE: '/edit-customer-profile',
  EDIT_BUSINESS_PROFILE: '/edit-business-profile',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
} as const;

export { AppRoute };
