import { type FieldPath, type FieldValues } from 'react-hook-form';

type FormField<T extends FieldValues> = {
  type?: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
};

export { type FormField };
