const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
} as const;

export { BusinessApiPath };
