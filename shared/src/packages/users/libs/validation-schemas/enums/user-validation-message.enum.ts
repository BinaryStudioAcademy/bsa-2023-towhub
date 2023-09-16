const UserValidationMessage = {
  FIELD_IS_REQUIRED: 'This field is mandatory',
  EMAIL_NOT_VALID: 'This email does not seem valid',
  PASSWORD_NOT_VALID: 'Must be 6+ characters, at least 1 letter and 1 number',
  NAME_NOT_VALID: 'Must be 1 - 40 characters, start with a letter, no digits',
  PHONE_NOT_VALID: 'Must be 7-18 digits, start with +',
  TAX_NUMBER_NOT_VALID: 'Must be 8 or more characters',
  COMPANY_NAME_NOT_VALID: 'Must be 8 or more characters',
  DRIVER_LICENSE_NUMBER_NOT_VALID:
    'Must be 3 capital letters, followed by a space and 6 digits',
} as const;

export { UserValidationMessage };
