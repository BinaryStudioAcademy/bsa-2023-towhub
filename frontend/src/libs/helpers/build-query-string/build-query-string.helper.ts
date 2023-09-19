const buildQueryString = <T extends Record<string, string | number | string[]>>(
  queryParameters: T | null,
): string => {
  if (queryParameters === null) {
    return '';
  }

  const parameters = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParameters)) {
    if (Array.isArray(value)) {
      parameters.append(key, value.join(','));
    } else {
      parameters.append(key, value.toString());
    }
  }

  return `?${parameters.toString()}`;
};

export { buildQueryString };
