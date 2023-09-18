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
  errors: FieldErrors<T>;
  label?: string;
  onChange?: (option: MultiValue<T>) => void;
  placeholder?: string;
  field?: ControllerRenderProps<T, FieldPath<T>>;
  className?: string;
};

const getClassNames = (
  isMenuOpen: boolean,
): ClassNamesConfig<SelectOption, true, GroupBase<SelectOption>> => ({
  container: () => styles.container,
  control: () => getValidClassNames(styles.control, styles.multiControl),
  multiValueLabel: () => styles.multiValueLabel,
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

const DropdownMultiSelect = <T extends FieldValues>({
  options,
  name,
  control,
  errors,
  label,
  placeholder,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({
    name: name as FieldPath<T>,
    control,
  });

  const error = errors[name]?.message;
  const hasLabel = Boolean(label);
  const hasError = Boolean(error);
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
    value: string[] | undefined,
  ): MultiValue<SelectOption> | undefined => {
    return options.filter((opt) => (value ?? []).includes(opt.value));
  };

  const inputStyles = [styles.input, hasError && styles.error];

  const handleChange = useCallback(
    (option: MultiValue<SelectOption> | SingleValue<SelectOption>[]) => {
      const selectedValues = option
        .map((opt) => opt?.value)
        .filter((value) => typeof value === 'string') as string[];

      field.onChange(selectedValues);
    },
    [field],
  );

  return (
    <label className={styles.inputComponentWrapper}>
      {hasLabel && <span className={styles.label}>{label}</span>}
      <span className={styles.inputWrapper}>
        <Select<SelectOption, true>
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
          value={findOptionByValue(field.value)}
          placeholder={placeholder}
          isMulti
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

export { DropdownMultiSelect };
