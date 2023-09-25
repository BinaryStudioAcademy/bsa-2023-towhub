const createFileList = (
  image: Blob,
  filename: string,
  mimetype: string,
): FileList => {
  const file = new File([image], filename, {
    type: mimetype,
  });
  const dt = new DataTransfer();
  dt.items.add(file);

  return dt.files;
};

export { createFileList };
