const readFile = (
  file: File,
  onFinishCallback: (url: string) => void,
): void => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    onFinishCallback(String(reader.result));
  });
  reader.readAsDataURL(file);
};

export { readFile };
