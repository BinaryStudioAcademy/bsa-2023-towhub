import Select, { type StylesConfig } from 'react-select';

import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';

type Option = { label: string; value: string };

type Properties = {
  options: Option[];
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

const Dropdown: React.FC<Properties> = ({
  options,
}: Properties): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  const stylesConfig = useMemo(() => getStyles(isMenuOpen), [isMenuOpen]);

  return (
    <Select
      options={options}
      classNamePrefix="react-select"
      styles={stylesConfig}
      isSearchable={false}
      menuIsOpen={isMenuOpen}
      onMenuOpen={handleToggleMenu}
      onMenuClose={handleToggleMenu}
    />
  );
};

export { Dropdown };
