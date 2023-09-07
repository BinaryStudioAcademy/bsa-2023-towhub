import { TruckYear } from './truck-year.enum.js';

const TruckValidationMessage = {
  INVALID: 'Invalid field',
  REQUIRED: 'This field is mandatory',
  NUMBER_INVALID: 'Must be 1 - 3 digits, no spaces.',
  LICENSE_PLATE_INVALID: 'Must be 3 - 10 characters, no spaces.',
  YEAR_INVALID: `Must be 2000 - ${TruckYear.MAX}, no spaces.`,
  ID_NOT_A_NUMBER: 'ID must be a number',
} as const;

export { TruckValidationMessage };
