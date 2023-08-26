const HttpMessage = {
  USER_EXISTS: 'User already exists',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create business!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
} as const;

export { HttpMessage };
