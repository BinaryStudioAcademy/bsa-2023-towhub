const configureString = <T extends Record<string, string | number>>(
  ...parameters: [...string[], T]
): string => {
  const copiedArguments = [...parameters];

  const options = copiedArguments.pop() as T;

  let result = copiedArguments.join('');

  for (const [key, value] of Object.entries(options)) {
    result = result.replace(`:${key}`, value.toString());
  }

  return result;
};

export { configureString };
