import { type SelectOption } from '~/libs/types/select-option.type';

const createOption = (value: number): SelectOption => {
  return { label: `${value}`, value: `${value}` };
};

const createOptions = (pageSizes: number[]): SelectOption[] => {
  return pageSizes.map((value) => createOption(value));
};

export { createOption, createOptions };
export {
  convertToIndex,
  convertToNumber,
  getMiddle,
  getNextPageIndex,
  getPreviousPageIndex,
} from 'shared/build/index.js';
