import { type FieldPath, type FieldValues } from 'react-hook-form';

import { type ValueOf } from '~/libs/types/types.js';

import { type InputType } from '../enums/input-type.enum.js';
import { type SelectOption } from './select-option.type.js';

type FormField<T extends FieldValues> = {
  type?: ValueOf<typeof InputType>;
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
