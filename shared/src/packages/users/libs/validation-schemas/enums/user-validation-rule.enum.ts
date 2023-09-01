const UserValidationRule = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$/,
  NAME: /^['A-Za-z-]{1,40}$/,
  PHONE: /^\+\d{8,19}$/,
  TAX_NUMBER: /^[\d\s./A-Z-]{8,19}$/,
  COMPANY_NAME: /^[\s\w!#&'*+,.;?@~-]{1,40}$/,
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 254,
} as const;

export { UserValidationRule };
