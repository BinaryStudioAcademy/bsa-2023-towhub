const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  ORDER: '/order/:id',
  DRIVER_PROFILE: '/driver/:id',
} as const;

export { AppRoute };
