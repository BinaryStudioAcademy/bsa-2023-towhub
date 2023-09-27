const createFileList = (image: Blob, filename: string): FileList => {
  const { type } = image;
  const file = new File([image], filename, { type });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  return dataTransfer.files;
};

export { createFileList };
