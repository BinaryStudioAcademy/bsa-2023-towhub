const OrdersValidationMessage = {
  ID_MUST_BE_NUMBER: 'Orders id must be number',
  USER_ID_MUST_BE_NUMBER: 'Orders userId must be number',
  BUSINESS_ID_MUST_BE_NUMBER: 'Orders businessId must be number',
  DRIVER_ID_MUST_BE_NUMBER: 'Orders driverId must be number',
  TRUCK_ID_MUST_BE_NUMBER: 'Orders truckId must be number',
  CARS_QTY_MUST_BE_NUMBER: 'Orders carsQty must be number',
  FIELD_IS_REQUIRED: 'This field is mandatory',
  NAME_NOT_VALID: 'Must be 1 - 40 characters, start with a letter, no digits',
  PHONE_NOT_VALID: 'Must be 7-18 digits, start with +',
} as const;

export { OrdersValidationMessage };
