import { type SelectOption } from '~/libs/types/select-option.type';

const getMiddle = (size: number): number => Math.floor(size / 2);

const convertToNumber = (index: number): number => index + 1;
const convertToIndex = (index: number): number => index - 1;

const createOption = (value: number): SelectOption => {
  return { label: `${value}`, value: `${value}` };
};

const createOptions = (array: number[]): SelectOption[] => {
  return array.map((value) => createOption(value));
};

export {
  convertToIndex,
  convertToNumber,
  createOption,
  createOptions,
  getMiddle,
};
