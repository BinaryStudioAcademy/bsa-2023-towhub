import {
  type ErrorOption,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { type HttpMessage } from '~/libs/enums/enums.js';

import { type SelectOption } from './select-option.type.js';
import { type ValueOf } from './types.js';

type KnownErrorMessages = ValueOf<typeof HttpMessage>;

type ErrorDescriptor =
  | {
      errorMessage: KnownErrorMessages;
      error: ErrorOption;
      options?: {
        shouldFocus: boolean;
      };
    }
  | KnownErrorMessages;

type FormField<T extends FieldValues> = {
  type?: 'text' | 'email' | 'password' | 'number' | 'dropdown' | 'file';
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
  options?: SelectOption[];
  min?: number;
  max?: number;
  currency?: string;
  step?: number;
  id?: number;
  associateServerErrors?: ErrorDescriptor[];
};

export { type ErrorDescriptor, type FormField };
