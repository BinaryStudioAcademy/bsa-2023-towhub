import {
  type DropzoneOptions,
  type ErrorCode,
  type FileRejection,
  useDropzone,
} from 'react-dropzone';
import { type FieldPath, type FieldValues, useForm } from 'react-hook-form';

import { ChosenFilePreview } from '~/libs/components/chosen-file-preview/chosen-file-preview.js';
import { fileInputDefaultsConfig } from '~/libs/components/file-input/libs/config/file-input-defaults.config';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController, useMemo } from '~/libs/hooks/hooks.js';

import { Icon } from '../icon/icon.jsx';
import { DropzoneFormatErrorMessage } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  label?: string;
  name: FieldPath<T>;
  isDisabled?: boolean;
  fileInputCustomConfig?: DropzoneOptions;
};

const FileInput = <T extends FieldValues>({
  label,
  name,
  isDisabled = false,
  fileInputCustomConfig,
}: Properties<T>): JSX.Element => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: { [name]: new File([''], '') },
    mode: 'onChange',
  });

  const {
    field: { onChange, value },
  } = useFormController({ name, control });

  const fileInputConfig = useMemo(
    () => ({
      ...fileInputCustomConfig,
      ...fileInputDefaultsConfig,
    }),
    [fileInputCustomConfig],
  );

  const handleDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0]);
    },
    [onChange],
  );

  const handleDropRejected = useCallback(
    ([{ errors }]: FileRejection[]): void => {
      for (const error of errors) {
        setError(name, {
          type: error.code,
          message: DropzoneFormatErrorMessage(
            error.code as ErrorCode,
            fileInputConfig,
          ),
        });
      }
    },
    [fileInputConfig, name, setError],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
    noDrag: isDisabled,
    noClick: isDisabled,
    noKeyboard: true,
    ...fileInputConfig,
  });

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  // const hasLabel = Boolean(label);

  const onFileSubmit = useCallback(() => {
    /*
    data: Record<string, File> ----^
    TODO:
    x 1. Slice `files`, where file send status will be stored
    x 2. uploadFile thunk, where new FormData will be created and file data will be appended
    x 3. packages/files (for api that will be called in the thunk. Api will take formData object as a parameter)
    ... 4. Call the thunk here, listen for status here. (check app.tsx for example)
    5. Update file send status via ChosenFilePreview`s fileStatus*/
  }, []);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onFileSubmit)(event_);
    },
    [handleSubmit, onFileSubmit],
  );

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.wrapper}>
        <div
          {...getRootProps({
            className: getValidClassNames(
              styles.inputWrapper,
              isDisabled && styles.disabled,
            ),
          })}
        >
          <input
            {...getInputProps({
              className: styles.fileInput,
              name: 'stst',
            })}
          />
          <Icon
            className={getValidClassNames(
              styles.icon,
              isDisabled && styles.disabled,
            )}
            iconName={IconName.CLOUD_UPLOAD}
          />
          <p
            className={getValidClassNames(
              styles.label,
              isDisabled && styles.disabled,
              styles.textMd,
            )}
          >
            {label}
          </p>
          <p
            className={getValidClassNames(
              styles.errorMessage,
              hasError && styles.visible,
              styles.textSm,
            )}
          >
            {error as string}
          </p>
        </div>
        <div className={styles.uploadedArea}>
          {value.size > 0 && <ChosenFilePreview file={value} />}
        </div>
      </div>
      <button>SUBMIT</button>
    </form>
  );
};

export { FileInput };
