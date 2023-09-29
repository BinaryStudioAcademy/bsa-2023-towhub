const getMiddle = (size: number): number => Math.floor(size / 2);
const getNextPageIndex = (pageIndex: number): number => pageIndex + 1;
const getPreviousPageIndex = (pageIndex: number): number => pageIndex - 1;

const convertToNumber = (index: number): number => index + 1;
const convertToIndex = (index: number): number => index - 1;

export {
  convertToIndex,
  convertToNumber,
  getMiddle,
  getNextPageIndex,
  getPreviousPageIndex,
};
