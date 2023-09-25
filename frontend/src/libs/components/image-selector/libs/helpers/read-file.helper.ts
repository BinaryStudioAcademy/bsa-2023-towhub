const readFile = (file: File, onFinish: (url: string) => void): void => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    onFinish(String(reader.result));
  });
  reader.readAsDataURL(file);
};

export { readFile };
