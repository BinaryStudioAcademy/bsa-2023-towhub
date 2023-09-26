import { type SelectOption } from '~/libs/types/select-option.type';

const getMiddle = (size: number): number => Math.floor(size / 2);
const getNextPageIndex = (pageIndex: number): number => pageIndex + 1;
const getPreviousPageIndex = (pageIndex: number): number => pageIndex - 1;

const convertToNumber = (index: number): number => index + 1;
const convertToIndex = (index: number): number => index - 1;

const createOption = (value: number): SelectOption => {
  return { label: `${value}`, value: `${value}` };
};

const createOptions = (pageSizes: number[]): SelectOption[] => {
  return pageSizes.map((value) => createOption(value));
};

export {
  convertToIndex,
  convertToNumber,
  createOption,
  createOptions,
  getMiddle,
  getNextPageIndex,
  getPreviousPageIndex,
};
