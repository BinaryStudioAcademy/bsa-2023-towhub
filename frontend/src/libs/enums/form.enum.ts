const FormName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
} as const;

const FormLabel = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
} as const;

export { FormLabel, FormName };
