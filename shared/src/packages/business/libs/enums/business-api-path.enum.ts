const BusinessApiPath = {
  ROOT: '/',
  $ID: '/:id',
  DRIVERS: '/:businessId/drivers',
  DRIVERS_BY_PAGE: '/:businessId/:pageIndex/:pageSize/drivers',
  DRIVER_$ID: '/:businessId/driver/:driverId',
} as const;

export { BusinessApiPath };
