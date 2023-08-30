const FormName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
  DRIVER_LICENSE_NUMBER: 'driverLicenseNumber',
} as const;

const FormLabel = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
  DRIVER_LICENSE_NUMBER: 'Driver license number',
} as const;

export { FormLabel, FormName };
