import Select, {
  type ClassNamesConfig,
  type GroupBase,
  type SingleValue,
} from 'react-select';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import styles from './style.module.scss';

type Properties = {
  options: SelectOption[];
  defaultValue?: SelectOption;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
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
      : getValidClassNames(styles.dropdownIndicator),
  indicatorSeparator: () => styles.indicatorSeparator,
});

const Dropdown: React.FC<Properties> = ({
  options,
  defaultValue,
  onChange,
  placeholder,
}: Properties): JSX.Element => {
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

  const handleChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (onChange) {
        onChange(option?.value);
      }
    },
    [onChange],
  );

  return (
    <Select<SelectOption>
      options={options}
      classNamePrefix="react-select"
      classNames={classNamesConfig}
      isSearchable={false}
      menuIsOpen={isMenuOpen}
      onMenuOpen={handleOpenMenu}
      onMenuClose={handleCloseMenu}
      onChange={handleChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
};

export { Dropdown };
