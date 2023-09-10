const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:businessId/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
  GENERATE_STRIPE_LINK: '/generate-stripe-link',
} as const;

export { BusinessApiPath };
