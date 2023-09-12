const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_TRUCKS: '/dashboard/trucks',
  DASHBOARD_DRIVERS: '/dashboard/drivers',
} as const;

export { AppRoute };
