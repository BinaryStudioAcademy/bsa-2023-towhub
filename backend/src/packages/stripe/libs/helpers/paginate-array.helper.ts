import { convertToIndex } from './helpers.js';

function paginateArray<T>(dataArray: T[], page: number, limit: number): T[] {
  const startIndex = convertToIndex(page) * limit;

  return dataArray.slice(startIndex, startIndex + limit);
}

export { paginateArray };
