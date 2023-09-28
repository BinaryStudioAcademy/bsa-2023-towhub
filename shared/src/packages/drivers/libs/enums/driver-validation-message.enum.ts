const DriverValidationMessage = {
  DRIVER_LICENSE_NUMBER_REQUIRED: 'This field is mandatory',
  DRIVER_LICENSE_NUMBER_INVALID:
    'This driver license number does not seem valid',
  ID_MUST_BE_NUMBER: 'Driver id must be number',
  USER_ID_MUST_BE_NUMBER: 'Driver user id must be number',
  BUSINESS_ID_MUST_BE_NUMBER: 'Driver user id must be number',
  UPDATE_AT_LEAST_ONE_FIELD:
    'Update fields are empty, there is nothing to update',
  TRUCK_IS_REQUIRED: 'Truck is required',
  FILES_MIN_LENGTH: 'Choose at least 1 file',
} as const;

export { DriverValidationMessage };
