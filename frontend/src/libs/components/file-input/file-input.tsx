import {
  type DropEvent,
  type DropzoneOptions,
  type ErrorCode,
  type FileRejection,
  useDropzone,
} from 'react-dropzone';
import { useFieldArray, useForm } from 'react-hook-form';

import { ChosenFilePreview } from '~/libs/components/chosen-file-preview/chosen-file-preview.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useBindEnterToClick,
  useCallback,
  useMemo,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { filesActions, FileStatus } from '~/slices/files/files.js';

import { Icon } from '../icon/icon.jsx';
import { fileInputDefaultsConfig } from './libs/config/config.js';
import {
  checkValidFileName,
  DropzoneFormatErrorMessage,
} from './libs/helpers/helpers.js';
import {
  type FileInputConfig,
  type FileUploadResponseDto,
} from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  label: string;
  isDisabled?: boolean;
  fileInputCustomConfig?: FileInputConfig;
  handleAfterSubmit?: (
    response: FileUploadResponseDto | null,
    error: HttpError | null,
  ) => unknown;
};

type FileObject = {
  id: string;
  webkitRelativePath: File['webkitRelativePath'];
  arrayBuffer: ReturnType<File['arrayBuffer']>;
  name: File['name'];
  size: File['size'];
  type: File['type'];
};

type FormType = { files: FileObject[] };

const FileInput = ({
  label,
  isDisabled = false,
  fileInputCustomConfig,
  handleAfterSubmit,
}: Properties): JSX.Element => {
  const uploadButtonReference = useRef<HTMLButtonElement>(null);
  useBindEnterToClick(uploadButtonReference);
  const dispatch = useAppDispatch();
  const { uploadStatus, error: uploadError } = useAppSelector((state) => ({
    uploadStatus: state.files.fileStatus,
    error: state.files.error,
  }));
  const isUploading = uploadStatus === FileStatus.UPLOADING;
  const isUploaded = uploadStatus === FileStatus.UPLOADED;

  const isFormNotAvailable = useMemo<boolean>(
    () => isDisabled || isUploading,
    [isDisabled, isUploading],
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FormType>();
  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'files',
  });

  const isEmpty = useMemo(() => files.length === 0, [files]);
  const isFormNotSubmittable = useMemo<boolean>(
    () => isEmpty || isDisabled || isUploading,
    [isEmpty, isDisabled, isUploading],
  );

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

      let files: File[] = [];

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
    noDrag: isFormNotAvailable,
    noClick: isFormNotAvailable,
    noKeyboard: true,
    ...fileInputConfig,
  });

  const validationError = errors.files?.message;
  const hasError = Boolean(validationError);

  const onFileSubmit = useCallback(
    async (data: FormType) => {
      const files = await Promise.all(
        data.files.map(async (fileObject) => {
          const contentBuffer = await fileObject.arrayBuffer;

          return new File([contentBuffer], fileObject.name, {
            type: fileObject.type,
          });
        }),
      );

      let response: FileUploadResponseDto | null = null;
      let error: HttpError | null = null;

      try {
        response = await dispatch(filesActions.uploadFile(files)).unwrap();
      } catch (error_) {
        error = error_ as HttpError;
      }

      if (!handleAfterSubmit) {
        return;
      }

      if (response) {
        return handleAfterSubmit(response, null);
      }

      handleAfterSubmit(null, error);
    },
    [dispatch, handleAfterSubmit],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onFileSubmit)(event_);
    },
    [handleSubmit, onFileSubmit],
  );

  const [isInputBeingUsed, setIsInputBeingUsed] = useState(false);

  let formMessage = label;

  if (isUploading) {
    formMessage = 'Uploading...';
  } else if (isUploaded) {
    formMessage = 'Uploaded';
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
              isInputBeingUsed &&
                !isFormNotAvailable &&
                styles.inputWrapperAnimated,
              isFormNotAvailable && styles.disabled,
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
              isFormNotAvailable && styles.disabled,
            )}
            iconName={IconName.CLOUD_UPLOAD}
          />
          <p
            className={getValidClassNames(
              styles.label,
              isFormNotAvailable && styles.disabled,
              styles.textMd,
            )}
          >
            {formMessage}
          </p>
          <p
            className={getValidClassNames(
              styles.errorMessage,
              styles.textSm,
              hasError && styles.visible,
            )}
          >
            {uploadError?.message ?? validationError}
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
        <button
          ref={uploadButtonReference}
          disabled={isFormNotSubmittable}
          className={getValidClassNames(
            styles.uploadFilesButton,
            isFormNotSubmittable && styles.disabled,
          )}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export { type FileObject };
export { FileInput };
