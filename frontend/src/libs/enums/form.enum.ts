const FormName = {
  NAME: 'firstName',
  SURNAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
} as const;

const FormLabel = {
  NAME: 'Name',
  SURNAME: 'Surname',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
} as const;

export { FormLabel, FormName };
