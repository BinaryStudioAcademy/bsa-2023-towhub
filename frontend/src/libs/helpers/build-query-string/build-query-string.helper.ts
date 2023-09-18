const buildQueryString = <T extends Record<string, string | number | boolean>>(
  queryParameters: T | null,
): string => {
  if (queryParameters === null) {
    return '';
  }

  const queryString = Object.keys(queryParameters)
    .map((key) => `${key}=${queryParameters[key].toString()}`)
    .join('&');

  return `?${queryString}`;
};

export { buildQueryString };
