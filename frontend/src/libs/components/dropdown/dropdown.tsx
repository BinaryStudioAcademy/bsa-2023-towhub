import Select, {
  type GroupBase,
  type SingleValue,
  type StylesConfig,
} from 'react-select';

import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

type Properties = {
  options: SelectOption[];
  defaultValue?: SelectOption;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
};

const getStyles = (
  isMenuOpen: boolean,
): StylesConfig<SelectOption, false, GroupBase<SelectOption>> => {
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

  const stylesConfig = useMemo(() => getStyles(isMenuOpen), [isMenuOpen]);

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
      styles={stylesConfig}
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
