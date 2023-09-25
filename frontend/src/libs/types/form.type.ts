import {
  type ErrorOption,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { type FormLabel, type HttpMessage } from '~/libs/enums/enums.js';

import { type InputType } from '../enums/input-type.enum.js';
import { type LocationChangeHandler } from './location-change-handler.type.js';
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
  type?: ValueOf<typeof InputType>;
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
  options?: SelectOption[];
  min?: number;
  max?: number;
  currency?: string;
  step?: number;
  id?: ValueOf<typeof FormLabel>;
  onLocationChange?: LocationChangeHandler;
  associateServerErrors?: ErrorDescriptor[];
};

export { type ErrorDescriptor, type FormField };
