const FrontendPath = {
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
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_TRUCKS: '/dashboard/trucks',
  DASHBOARD_DRIVERS: '/dashboard/drivers',
  ORDER: '/order',
  SETUP_PAYMENT: '/setup-payment',
  CHECKOUT: '/checkout',
  PAYMENTS: '/payments',
} as const;

export { FrontendPath };
