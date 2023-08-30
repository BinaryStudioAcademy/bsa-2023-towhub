import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, { type StylesConfig } from 'react-select';

import {
  useCallback,
  useFormController,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

type Properties<T extends FieldValues> = {
  options: SelectOption[];
  name: FieldPath<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
};

const getStyles = (isMenuOpen: boolean): StylesConfig => {
  return {
    control: (styles) => ({
      ...styles,
      height: '20px',
      minHeight: '20px',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
    }),
    option: (styles) => ({
      ...styles,
      padding: '10px',
      margin: '-4px 0',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      paddingLeft: '5px',
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      transition: 'all 0.2s ease',
      margin: '0',
      padding: '0',
      transform: `scaleY(${isMenuOpen ? '-1' : '1'})`,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (styles) => ({
      ...styles,
      overflow: 'hidden',
      padding: 0,
    }),
  };
};

const Dropdown = <T extends FieldValues>({
  options,
  name,
  control,
}: Properties<T>): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { field } = useFormController({ name, control });

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const stylesConfig = useMemo(() => getStyles(isMenuOpen), [isMenuOpen]);

  return (
    <Select
      {...field}
      options={options}
      classNamePrefix="react-select"
      styles={stylesConfig}
      isSearchable={false}
      menuIsOpen={isMenuOpen}
      onMenuOpen={handleOpenMenu}
      onMenuClose={handleCloseMenu}
    />
  );
};

export { Dropdown };
