const UserValidationRule = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$/,
  NAME: /^[A-Za-z][\s'A-Za-z-]{0,39}$/,
  PHONE: /^\+\d{7,18}$/,
  TAX_NUMBER: /^[\d\s./A-Z-]{8,19}$/,
  COMPANY_NAME: /^[\s\w!#&'*+,.;?@~-]{1,40}$/,
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 254,
  DRIVER_LICENSE_NUMBER: /^[A-Z]{3} \d{6}$/,
} as const;

export { UserValidationRule };
