const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:id/driver',
  DRIVER_$ID: '/:id/driver/:driverId',
} as const;

export { BusinessApiPath };
