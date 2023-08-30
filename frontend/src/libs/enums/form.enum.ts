const FormName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
  COMPANY_NAME: 'companyName',
  TAX_NUMBER: 'taxNumber',
} as const;

const FormLabel = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
  COMPANY_NAME: 'Company name',
  TAX_NUMBER: 'Tax number',
} as const;

export { FormLabel, FormName };
