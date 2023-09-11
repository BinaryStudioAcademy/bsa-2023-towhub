const TruckStatus = {
  //Cannot be selected neither by driver or client (i.e. on maintenance)
  NOT_AVAILABLE: 'Not available',
  //Can be selected by driver, cannot be selected by customer
  AVAILABLE: 'Available',
  //Already selected by some driver, can be selected by customer
  ACTIVE: 'Active',
  //Already selected by some driver and is served to some customer
  BUSY: 'Busy',
} as const;

export { TruckStatus };
