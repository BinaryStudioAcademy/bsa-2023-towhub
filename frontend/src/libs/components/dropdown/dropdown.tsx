import Select, { type StylesConfig } from 'react-select';

import { useCallback, useState } from '~/libs/hooks/hooks.js';

type Option = { label: string; value: string };

type Properties = {
  options: Option[];
};

const Dropdown: React.FC<Properties> = ({
  options,
}: Properties): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);

  const stylesConfig: StylesConfig = {
    control: (styles) => ({
      ...styles,
      width: '126px',
      height: '20px',
      minHeight: '20px',
      border: 'none',
      outline: 'none',
    }),
    option: (styles) => ({
      ...styles,
      margin: '0',
      padding: '2px 0',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0',
    }),
    input: (styles) => ({
      ...styles,
      margin: '0',
      padding: '0',
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
      width: '126px',
    }),
  };

  return (
    <Select
      options={options}
      classNamePrefix="react-select"
      styles={stylesConfig}
      isSearchable={false}
      menuIsOpen={isMenuOpen}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
    />
  );
};

export { Dropdown };
