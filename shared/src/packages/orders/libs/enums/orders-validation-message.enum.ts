const OrdersValidationMessage = {
  ID_MUST_BE_NUMBER: 'Orders id must be number',
  USER_ID_MUST_BE_NUMBER: 'Orders userId must be number',
  BUSINESS_ID_MUST_BE_NUMBER: 'Orders businessId must be number',
  SHIFT_ID_MUST_BE_NUMBER: 'Orders shiftId must be number',
  CARS_QTY_MUST_BE_NUMBER: 'Orders carsQty must be number',
} as const;

export { OrdersValidationMessage };
