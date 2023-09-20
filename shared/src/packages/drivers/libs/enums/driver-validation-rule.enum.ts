const DriverValidationRule = {
  DRIVER_LICENSE_MIN_LENGTH: 5,
  DRIVER_LICENSE_MAX_LENGTH: 30,
  DRIVER_LICENSE_NUMBER: /^[\dA-Z]+(?:[ -][\dA-Z]+)*$/,
} as const;

export { DriverValidationRule };
