function paginateArray<T>(dataArray: T[], page: number, limit: number): T[] {
  const startIndex = page * limit;

  return dataArray.slice(startIndex, startIndex + limit);
}

export { paginateArray };
