const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:businessId/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
  TRUCKS: '/trucks',
} as const;

export { BusinessApiPath };
