const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP_BUSINESS: '/sign-up/business',
  SIGN_UP_CUSTOMER: '/sign-up/customer',
  ORDER_HISTORY: '/order-history',
  EDIT_PROFILE: '/edit-profile',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  AVAILABLE_TRUCKS: '/available-trucks',
  ORDERS: '/orders',
  ORDER: '/order',
} as const;

export { AppRoute };
