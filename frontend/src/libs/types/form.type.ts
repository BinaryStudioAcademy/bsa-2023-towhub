import { type FieldPath, type FieldValues } from 'react-hook-form';

import { type SelectOption } from './select-option.type.js';

type FormField<T extends FieldValues> = {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'dropdown'
    | 'file'
    | 'multi';
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
  options?: SelectOption[];
  min?: number;
  max?: number;
  currency?: string;
  step?: number;
  id?: number;
};

export { type FormField };
