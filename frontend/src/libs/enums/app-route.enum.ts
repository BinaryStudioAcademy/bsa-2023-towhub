const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ORDER_HISTORY: '/order-history',
  EDIT_PROFILE: '/edit-profile',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  ORDER: '/order/:orderId',
} as const;

export { AppRoute };
