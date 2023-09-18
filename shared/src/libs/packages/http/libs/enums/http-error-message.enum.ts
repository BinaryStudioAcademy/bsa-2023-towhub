const HttpMessage = {
  USER_EXISTS: 'User already exists',
  BUSINESS_EXISTS: 'Business with specified tax number already exists',
  TRUCK_EXISTS: 'Truck already exists',
  NOT_FOUND: 'Not found',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  DRIVER_ALREADY_EXISTS: 'Driver already exists',
  DRIVER_LOCATION_UNKNOWN: 'Driver location is unknown',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create or update this!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
  TRUCK_DOES_NOT_EXIST: 'Truck does not exist!',
  DRIVER_DOES_NOT_EXIST: 'Driver does not exist!',
  LICENSE_NUMBER_ALREADY_EXISTS:
    'Driver with such license number already exists!',
  UNAUTHORIZED: 'You are not authorized',
  INVALID_JWT: 'Invalid JWT payload',
  WRONG_EMAIL: 'This email is not registered',
  WRONG_PASSWORD: 'The password is wrong',
  INVALID_GROUP: 'Provided group is unavailable',
  CANNOT_DELETE: 'Cannot delete this user',
  WRONG_SHIFT: 'Specified shift id is not belong to you',
  SHIFT_ALREADY_CLOSED: 'Specified shift is already closed',
  NOT_ACCESS: 'You do not have enough rights to operate this shift',
  ORDER_DOES_NOT_EXIST: 'Order does not exist!',
} as const;

export { HttpMessage };
