const Regexp = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$/,
  NAME: /^['A-Za-z-]{1,40}$/,
  PHONE: /^\+\d{8,19}$/,
  TAX_NUMBER: /^[\d\s./A-Z-]{8,19}$/,
  COMPANY_NAME: /^[\s!#&'*+,.;?@A-Z_a-z~-]{1,40}$/,
} as const;

export { Regexp };
