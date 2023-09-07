const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
} as const;

export { AppRoute };
