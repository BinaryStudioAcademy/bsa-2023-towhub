function constructUrl(
  baseUrl: string,
  path: string,
  queryParameters?: Record<string, string | number | boolean>,
): string {
  const url = new URL(`${baseUrl}${path}`);

  if (queryParameters) {
    for (const key of Object.keys(queryParameters)) {
      url.searchParams.append(key, queryParameters[key].toString());
    }
  }

  return url.toString();
}

export { constructUrl };
