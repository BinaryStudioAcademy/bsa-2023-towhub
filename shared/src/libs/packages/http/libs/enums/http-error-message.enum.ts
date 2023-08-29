const HttpMessage = {
  USER_EXISTS: 'User already exists',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  DRIVER_ALREADY_EXISTS: 'Driver already exists',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create or update this!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
  DRIVER_DOES_NOT_EXIST: 'Driver does not exist!',
  LICENSE_NUMBER_ALREADY_EXISTS:
    'Driver with such license number already exists!',
} as const;

export { HttpMessage };
