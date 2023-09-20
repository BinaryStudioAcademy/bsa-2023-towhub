const DriverValidationRule = {
  LICENSE_MIN_LENGTH: 5,
  LICENSE_MAX_LENGTH: 30,
  LICENSE_NUMBER: /^[\dA-Z]+(?:[ -][\dA-Z]+)*$/,
  LICENSE_SPACERS: /[\s-]/g,
} as const;

export { DriverValidationRule };
