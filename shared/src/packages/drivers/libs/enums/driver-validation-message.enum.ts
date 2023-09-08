const DriverValidationMessage = {
  DRIVER_LICENSE_NUMBER_REQUIRED: 'Driver license number is required',
  ID_MUST_BE_NUMBER: 'Driver id must be number',
  USER_ID_MUST_BE_NUMBER: 'Driver user id must be number',
  BUSINESS_ID_MUST_BE_NUMBER: 'Driver user id must be number',
  UPDATE_AT_LEAST_ONE_FIELD:
    'Update fields are empty, there is nothing to update',
  PAGE_SIZE_MUST_BE_NUMBER: 'Page size must be number',
  PAGE_INDEX_MUST_BE_NUMBER: 'Page index must be number',
} as const;

export { DriverValidationMessage };
