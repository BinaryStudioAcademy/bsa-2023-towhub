import {
  type Control,
  type ControllerRenderProps,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, {
  type ClassNamesConfig,
  type GroupBase,
  type MultiValue,
  type SingleValue,
} from 'react-select';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  options: SelectOption[];
  name?: FieldPath<T>;
  control?: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  defaultValue?: SelectOption;
  onChange?: (
    option: SingleValue<SelectOption> | SingleValue<SelectOption>[],
  ) => void;
  placeholder?: string;
  field?: ControllerRenderProps<T, FieldPath<T>>;
  className?: string;
  isMulti?: boolean;
};

const getClassNames = (
  isMenuOpen: boolean,
): ClassNamesConfig<SelectOption, false, GroupBase<SelectOption>> => ({
  container: () => styles.container,
  control: () => styles.control,
  option: () => styles.option,
  menu: () => styles.singleValue,
  placeholder: () => styles.placeholder,
  singleValue: () => styles.singleValue,
  valueContainer: () => styles.valueContainer,
  dropdownIndicator: () =>
    isMenuOpen
      ? getValidClassNames(styles.dropdownIndicator, styles.upside)
      : styles.dropdownIndicator,
  indicatorSeparator: () => styles.indicatorSeparator,
});

const Dropdown = <T extends FieldValues>({
  options,
  name,
  control,
  field,
  defaultValue,
  onChange,
  className,
  placeholder,
  isMulti = false,
}: Properties<T>): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const classNamesConfig = useMemo(
    () => getClassNames(isMenuOpen),
    [isMenuOpen],
  );

  const findOptionByValue = (
    value: string | string[] | undefined,
  ): SingleValue<SelectOption> | MultiValue<SelectOption> | undefined => {
    return isMulti
      ? options.filter((opt) => (value ?? []).includes(opt.value))
      : options.find((opt) => opt.value === value);
  };

  type SelectIsMultiType = T extends { isMulti: true } ? true : false;

  return (
    <Select<SelectOption>
      {...(name && control && field)}
      options={options}
      classNamePrefix="react-select"
      className={className}
      classNames={classNamesConfig}
      isSearchable={false}
      menuIsOpen={isMenuOpen}
      onMenuOpen={handleOpenMenu}
      onMenuClose={handleCloseMenu}
      onChange={onChange}
      defaultValue={defaultValue}
      value={findOptionByValue(field?.value)}
      placeholder={placeholder}
      isMulti={isMulti as SelectIsMultiType}
    />
  );
};

export { Dropdown };
