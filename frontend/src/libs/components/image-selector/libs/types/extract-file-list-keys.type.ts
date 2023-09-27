import {
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';

type ExtractFileListKeys<T extends FieldValues> = {
  [K in FieldPath<T>]: PathValue<T, K> extends FileList ? K : never;
}[FieldPath<T>];

export { type ExtractFileListKeys };
