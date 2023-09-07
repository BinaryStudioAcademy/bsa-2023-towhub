const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:businessId/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
  TRUCKS: '/:businessId/trucks',
} as const;

export { BusinessApiPath };
