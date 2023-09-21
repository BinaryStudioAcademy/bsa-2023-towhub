const getFullPath = (baseUrl: string, apiPath: string): string => {
  const url = new URL(baseUrl);

  return `${url.origin}${apiPath}`;
};

export { getFullPath };
