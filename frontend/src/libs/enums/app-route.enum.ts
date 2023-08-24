const AppRoute = {
  ROOT: '/',
  ANY: '*',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ORDER_HISTORY: '/order-history',
  EDIT_PROFILE: '/edit-profile',
} as const;

export { AppRoute };
