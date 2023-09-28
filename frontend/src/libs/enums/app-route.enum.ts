const AppRoute = {
  ROOT: '/',
  ANY: '*',
  WELCOME: '/welcome',
  SIGN_IN: '/sign-in',
  SIGN_UP_BUSINESS: '/sign-up/business',
  SIGN_UP_CUSTOMER: '/sign-up/customer',
  ORDER_HISTORY: '/order-history',
  EDIT_PROFILE: '/edit-profile',
  PROFILE: '/profile',
  TRUCKS: '/trucks',
  DASHBOARD: '/dashboard',
  AVAILABLE_TRUCKS: '/available-trucks',
  ORDERS: '/orders',
  DRIVER_ORDER: '/driver/orders',
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_TRUCKS: '/dashboard/trucks',
  DASHBOARD_DRIVERS: '/dashboard/drivers',
  DASHBOARD_CHOOSE_TRUCK: '/dashboard/choose-truck',
  ORDER: '/order',
  ORDER_STATUS: '/order/:orderId',
} as const;

export { AppRoute };
