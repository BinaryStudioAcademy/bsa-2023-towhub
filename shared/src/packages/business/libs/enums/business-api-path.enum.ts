const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:id/drivers',
  DRIVER_$ID: '/:id/driver/:driverId',
} as const;

export { BusinessApiPath };
