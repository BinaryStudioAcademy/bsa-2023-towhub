import { type FileObject } from '~/libs/components/file-input/libs/types/types.js';

const getFileFromFileObject = async (fileObject: FileObject): Promise<File> => {
  const contentBuffer = await fileObject.arrayBuffer;

  return new File([contentBuffer], fileObject.name, {
    type: fileObject.type,
  });
};

export { getFileFromFileObject };
