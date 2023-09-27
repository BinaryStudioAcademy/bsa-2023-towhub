const hasSingleFile = (files: FileList | null): files is FileList => {
  return files?.length === 1;
};

export { hasSingleFile };
