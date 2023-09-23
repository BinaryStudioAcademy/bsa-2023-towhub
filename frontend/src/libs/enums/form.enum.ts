const FormName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
  DRIVER_LICENSE_NUMBER: 'driverLicenseNumber',
  DRIVER_LICENSE_SCAN: 'files',
  COMPANY_NAME: 'companyName',
  TAX_NUMBER: 'taxNumber',
} as const;

const FormLabel = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
  DRIVER_LICENSE_NUMBER: 'Driver license number',
  COMPANY_NAME: 'Company name',
  TAX_NUMBER: 'Tax number',
  DRIVER_LICENSE_SCAN: 'Driver license scan',
} as const;

export { FormLabel, FormName };
