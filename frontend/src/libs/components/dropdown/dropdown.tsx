import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, {
  type GroupBase,
  type SingleValue,
  type StylesConfig,
} from 'react-select';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useFormController,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  options: SelectOption[];
  name?: FieldPath<T>;
  control?: Control<T, null>;
  errors?: FieldErrors<T>;
  label?: string;
  defaultValue?: SelectOption;
  onChange?: (value: string | undefined) => void;
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

const Dropdown = <T extends FieldValues>({
  options,
  name,
  control,
  label,
  errors,
  defaultValue,
  onChange,
}: Properties<T>): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { field } = useFormController({
    name: name as FieldPath<T>,
    control,
  });

  const error = errors?.[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const stylesConfig = useMemo(() => getStyles(isMenuOpen), [isMenuOpen]);
  const inputStyles = [styles.input, hasError && styles.error];

  const handleChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (onChange) {
        onChange(option?.value);
      }
    },
    [onChange],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Select<SelectOption>
          {...(name && control ? field : {})}
          options={options}
          classNamePrefix="react-select"
          className={getValidClassNames(inputStyles)}
          styles={stylesConfig}
          isSearchable={false}
          menuIsOpen={isMenuOpen}
          onMenuOpen={handleOpenMenu}
          onMenuClose={handleCloseMenu}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </span>
      <span
        className={getValidClassNames(
          styles.errorMessage,
          hasError && styles.visible,
        )}
      >
        {error as string}
      </span>
    </label>
  );
};

export { Dropdown };
