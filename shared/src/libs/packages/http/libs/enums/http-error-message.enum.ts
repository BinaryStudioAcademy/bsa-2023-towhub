const HttpMessage = {
  USER_EMAIL_EXISTS: 'User with this email already exists',
  USER_PHONE_EXISTS: 'User with this phone already exists',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  DRIVER_ALREADY_EXISTS: 'Driver already exists',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create or update this!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
  DRIVER_DOES_NOT_EXIST: 'Driver does not exist!',
  LICENSE_NUMBER_ALREADY_EXISTS:
    'Driver with such license number already exists!',
  UNAUTHORIZED: 'You are not authorized',
  INVALID_JWT: 'Invalid JWT payload',
  WRONG_EMAIL: 'This email is not registered',
  WRONG_PASSWORD: 'The password is wrong',
  INVALID_GROUP: 'Provided group is unavailable',
  CANNOT_DELETE: 'Cannot delete this user',
} as const;

export { HttpMessage };
