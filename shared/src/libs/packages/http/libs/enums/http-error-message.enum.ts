const HttpMessage = {
  USER_EMAIL_EXISTS: 'User with this email already exists',
  USER_PHONE_EXISTS: 'User with this phone already exists',
  FILE_DOES_NOT_EXIST: 'File with such id does not exist!',
  BUSINESS_EXISTS: 'Business with specified tax number already exists',
  TRUCK_EXISTS: 'Truck with specified license plate number already exists',
  NOT_FOUND: 'Not found',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business',
  DRIVER_ALREADY_EXISTS: 'Driver already exists',
  DRIVER_LICENSE_ALREADY_EXISTS:
    'Driver with such license number already exists',
  USER_FIRST_NAME_ALREADY_EXISTS: 'User with such first name already exists',
  USER_LAST_NAME_ALREADY_EXISTS: 'User with such last name already exists',
  USER_PHONE_ALREADY_EXISTS: 'User with such phone number already exists',
  USER_EMAIL_ALREADY_EXISTS: 'User with such email already exists',
  DRIVER_LOCATION_UNKNOWN: 'Driver location is unknown',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists',
  INVALID_USER_GROUP: 'User of the group cannot create or update this!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
  TRUCK_DOES_NOT_EXIST: 'Truck does not exist!',
  DRIVER_DOES_NOT_EXIST: 'Driver does not exist!',
  LICENSE_NUMBER_ALREADY_EXISTS:
    'Driver with such license number already exists!',
  UNAUTHORIZED: 'You are not authorized',
  INVALID_JWT: 'Invalid JWT payload',
  WRONG_EMAIL: 'User with such email is not registered',
  WRONG_PASSWORD: 'Entered invalid password',
  INVALID_GROUP: 'Provided group is unavailable',
  CANNOT_DELETE: 'Cannot delete this user',
  WRONG_SHIFT: 'Specified shift id is not belong to you',
  SHIFT_ALREADY_CLOSED: 'Specified shift is already closed',
  NOT_ACCESS: 'You do not have enough rights to operate this shift',
  USER_CAN_NOT_ACCEPT_OR_DECLINE_ORDER:
    'You can not decline or accept this order',
  DRIVER_DOES_NOT_START_SHIFT: 'Driver does not start shift',
  ORDER_DOES_NOT_EXIST: 'Order does not exist',
  SHIFT_NOT_OPEN: 'This truck is not inactive, please choose another one',
  BUSINESS_STRIPE_NOT_ACTIVATED:
    'Business without activated stripe account is not supported',
  STRIPE_WEBHOOK_ERROR: 'Error parsing stripe webhook request',
} as const;

export { HttpMessage };
