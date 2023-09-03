import { type DropzoneOptions } from 'react-dropzone';

type FileInputConfig = Pick<
  DropzoneOptions,
  'multiple' | 'maxFiles' | 'maxSize' | 'minSize' | 'accept'
>;

export { type FileInputConfig };
