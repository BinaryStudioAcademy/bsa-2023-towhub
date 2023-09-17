import {
  type DropEvent,
  type DropzoneOptions,
  type ErrorCode,
  type FileRejection,
  useDropzone,
} from 'react-dropzone';
import {
  type Control,
  type FieldValues,
  type UseFormReturn,
  useFieldArray,
} from 'react-hook-form';

import { ChosenFilePreview } from '~/libs/components/chosen-file-preview/chosen-file-preview.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useBindEnterToClick,
  useCallback,
  useMemo,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';

import { Icon } from '../icon/icon.jsx';
import { fileInputDefaultsConfig } from './libs/config/config.js';
import {
  checkValidFileName,
  DropzoneFormatErrorMessage,
} from './libs/helpers/helpers.js';
import {
  type FileFormType,
  type FileInputConfig,
  type FileObject,
} from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  label: string;
  isDisabled?: boolean;
  fileInputCustomConfig?: FileInputConfig;
  control: Control<FileFormType, null>;
  setError: UseFormReturn<FileFormType>['setError'];
  errors: UseFormReturn<T>['formState']['errors'];
  clearErrors: UseFormReturn<FileFormType>['clearErrors'];
};

const FileInput = <T extends FieldValues & FileFormType>({
  label,
  isDisabled = false,
  fileInputCustomConfig,
  control,
  setError,
  errors,
  clearErrors,
}: Properties<T>): JSX.Element => {
  const uploadButtonReference = useRef<HTMLButtonElement>(null);
  useBindEnterToClick(uploadButtonReference);
  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'files',
  });

  const handleDeleteFile = useCallback(
    (id: string) => {
      const index = files.findIndex((file) => file.id === id);
      remove(index);
      clearErrors('files');
    },
    [remove, files, clearErrors],
  );

  const fileInputConfig = useMemo(
    (): DropzoneOptions =>
      ({
        ...fileInputDefaultsConfig,
        ...fileInputCustomConfig,
      }) as DropzoneOptions,
    [fileInputCustomConfig],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const areAllFilesInvalid =
        rejectedFiles.length > 0 || acceptedFiles.length === 0;

      if (areAllFilesInvalid) {
        return;
      }
      clearErrors('files');

      append(
        acceptedFiles.map(
          (file) =>
            ({
              webkitRelativePath: file.webkitRelativePath,
              arrayBuffer: file.arrayBuffer(),
              name: file.name,
              size: file.size,
              type: file.type,
            }) as FileObject,
        ),
      );
    },
    [append, clearErrors],
  );

  const handleDropRejected = useCallback(
    ([{ file, errors }]: FileRejection[]): void => {
      for (const error of errors) {
        setError('files', {
          type: error.code,
          message: DropzoneFormatErrorMessage(
            error.code as ErrorCode,
            fileInputConfig,
            file,
          ),
        });
      }
    },
    [fileInputConfig, setError],
  );

  const handleFilesFromEvent = useCallback(
    async (event: DropEvent) => {
      const { dataTransfer } = event as DragEvent;

      let files: File[];

      if (dataTransfer) {
        files = [...dataTransfer.files];
      } else {
        const fileHandles = event as unknown as FileSystemFileHandle[];
        files = await Promise.all(fileHandles.map((file) => file.getFile()));
      }

      for (const file of files) {
        const isValidFileName = checkValidFileName(file.name);

        if (!isValidFileName) {
          setError('files', {
            type: 'invalid-file-name',
            message: `File "${file.name}": Invalid name.`,
          });

          return [];
        }
      }

      return files;
    },
    [setError],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    getFilesFromEvent: handleFilesFromEvent,
    noDrag: isDisabled,
    noClick: isDisabled,
    noKeyboard: true,
    ...fileInputConfig,
  });

  const validationError = errors.files?.message;
  const hasError = Boolean(validationError);

  const [isInputBeingUsed, setIsInputBeingUsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        {...getRootProps({
          onDragEnter: () => {
            setIsInputBeingUsed(true);
          },
          onDragLeave: () => {
            setIsInputBeingUsed(false);
          },
          onMouseEnter: () => {
            setIsInputBeingUsed(true);
          },
          onMouseLeave: () => {
            setIsInputBeingUsed(false);
          },
          className: getValidClassNames(
            styles.inputWrapper,
            isInputBeingUsed && !isDisabled && styles.inputWrapperAnimated,
            isDisabled && styles.disabled,
          ),
        })}
      >
        <input
          {...getInputProps({
            className: styles.fileInput,
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
            styles.textSm,
            hasError && styles.visible,
          )}
        >
          {String(validationError)}
        </p>
      </div>
      <div className={styles.uploadedArea}>
        {files.map((file) => {
          return (
            <ChosenFilePreview
              key={file.id}
              file={file}
              handleDeleteFile={handleDeleteFile}
            />
          );
        })}
      </div>
    </div>
  );
};

export { FileInput };
