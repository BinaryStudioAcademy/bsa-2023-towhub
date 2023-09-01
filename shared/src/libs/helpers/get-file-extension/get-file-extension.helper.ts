const getFileExtension = (fileName: string): null | string => {
  const nameParts = fileName.split('.');

  if (nameParts.length === 1) {
    return null;
  }

  return nameParts.pop() as string;
};

export { getFileExtension };
