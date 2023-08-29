/* eslint-disable @typescript-eslint/quotes */
const HttpMessage = {
  USER_EXISTS: 'User already exists',
  BUSINESS_ALREADY_EXISTS: 'Owner already has business!',
  NAME_ALREADY_REGISTERED: 'Business with such name already exists!',
  INVALID_USER_GROUP: 'User of the group cannot create business!',
  BUSINESS_DOES_NOT_EXIST: 'Business does not exist!',
  UNAUTHORIZED: "You're not authorized",
  INVALID_JWT: 'Invalid JWT payload',
  WRONG_EMAIL: 'This email is not registered',
  WRONG_PASSWORD: 'The password is wrong',
  INVALID_GROUP: 'Provided group is unavailable',
} as const;

export { HttpMessage };
