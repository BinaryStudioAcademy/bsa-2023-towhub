function paginateArray<T>(dataArray: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit;

  return dataArray.slice(startIndex, startIndex + limit);
}

export { paginateArray };
