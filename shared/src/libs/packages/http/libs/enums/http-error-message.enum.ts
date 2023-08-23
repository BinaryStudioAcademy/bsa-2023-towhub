const HttpErrorMessage = {
  FORBIDDEN: 'Action is forbidden',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  TAX_NUMBER_ALREADY_REGISTERED:
    'Business with such tax number already exists!',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create business!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
} as const;

export { HttpErrorMessage };
