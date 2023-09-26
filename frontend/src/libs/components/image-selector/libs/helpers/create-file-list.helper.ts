const createFileList = (image: Blob, filename: string): FileList => {
  const { type } = image;
  const file = new File([image], filename, { type });
  const dt = new DataTransfer();
  dt.items.add(file);

  return dt.files;
};

export { createFileList };
