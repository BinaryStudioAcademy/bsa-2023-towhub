import { type FormField } from '~/libs/types/types.js';

import { FilterOption, FilterValue } from '../enums/enums.js';

type FilterForm = {
  userLocation: string;
  priceDropdown: string;
  capacityDropdown: string;
};

const Fields: FormField<FilterForm>[] = [
  {
    label: '',
    name: 'userLocation',
    placeholder: 'Select location...',
    type: 'location',
  },
  {
    label: 'Price Dropdown',
    name: 'priceDropdown',
    placeholder: 'Select price...',
    type: 'dropdown',
    options: [
      { label: FilterOption.LOW_TO_HIGH, value: FilterValue.ASC },
      { label: FilterOption.HIGH_TO_LOW, value: FilterValue.DESC },
    ],
  },
  {
    label: 'Capacity Dropdown',
    name: 'capacityDropdown',
    placeholder: 'Select capacity...',
    type: 'dropdown',
    options: [
      { label: FilterOption.LOW_TO_HIGH, value: FilterValue.ASC },
      { label: FilterOption.HIGH_TO_LOW, value: FilterValue.DESC },
    ],
  },
];

export { Fields };
