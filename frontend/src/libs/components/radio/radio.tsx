import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Checkbox } from '../checkbox/checkbox.js';

type Properties<T extends FieldValues, N extends FieldPath<T>> = Omit<
  Parameters<typeof Checkbox<T, N>>[0],
  'mode'
>;

const Radio = <T extends FieldValues, N extends FieldPath<T>>(
  properties: Properties<T, N>,
): JSX.Element => {
  return Checkbox({ ...properties, mode: 'radio' });
};

export { Radio };
