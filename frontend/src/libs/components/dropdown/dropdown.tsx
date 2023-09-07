import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, {
  type ClassNamesConfig,
  type GroupBase,
  type SingleValue,
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
  control?: Control<T, null> | undefined;
  errors?: FieldErrors<T>;
  label?: string;
  defaultValue?: SelectOption;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  insideInput?: boolean;
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

const Dropdown = <T extends FieldValues>({
  options,
  name,
  control,
  label,
  errors,
  defaultValue,
  onChange,
  placeholder,
  insideInput = true,
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

  const { field } = control
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useFormController({
        name: name as FieldPath<T>,
        control,
      })
    : { field: null };

  const error = errors?.[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);

  const inputStyles = [styles.input, hasError && styles.error];

  const handleChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (onChange) {
        onChange(option?.value);
      }
      field?.onChange(option);
    },
    [onChange, field],
  );

  return insideInput ? (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Select<SelectOption>
          {...(name && control && field)}
          options={options}
          classNamePrefix="react-select"
          className={getValidClassNames(inputStyles)}
          classNames={classNamesConfig}
          isSearchable={false}
          menuIsOpen={isMenuOpen}
          onMenuOpen={handleOpenMenu}
          onMenuClose={handleCloseMenu}
          onChange={handleChange}
          defaultValue={defaultValue}
          value={field?.value}
          placeholder={placeholder}
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
  ) : (
    <Select<SelectOption>
      options={options}
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
