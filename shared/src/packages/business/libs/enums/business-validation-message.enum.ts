const BusinessValidationMessage = {
  COMPANY_NAME_REQUIRED: 'Company name is required',
  TAX_NUMBER_REQUIRED: 'Tax number is required',
  ID_MUST_BE_NUMBER: 'Business id must be number',
  OWNER_ID_MUST_BE_NUMBER: 'Business owner id must be number',
  UPDATE_AT_LEAST_ONE_FIELD: 'Update DTO is empty, nothing to update',
} as const;

export { BusinessValidationMessage };
