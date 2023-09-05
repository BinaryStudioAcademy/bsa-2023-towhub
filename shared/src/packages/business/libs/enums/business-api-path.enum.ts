const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:businessId/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
} as const;

export { BusinessApiPath };
