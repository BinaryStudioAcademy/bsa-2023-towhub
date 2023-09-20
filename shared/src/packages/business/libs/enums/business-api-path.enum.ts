const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/drivers',
  DRIVER_$ID: '/driver/:driverId',
  TRUCKS: '/trucks',
} as const;

export { BusinessApiPath };
