const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  AVAILABLE_TRUCKS: '/available-trucks',
} as const;

export { AppRoute };
