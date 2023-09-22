const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  TRUCKS: '/trucks',
  DRIVERS: '/drivers',
  DRIVER_$ID: '/driver/:driverId',
} as const;

export { BusinessApiPath };
