import 'croppie/croppie.css';

import React, { useMemo } from 'react';
import {
  type FieldValues,
  type PathValue,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { Icon, Modal } from '~/libs/components/components.js';
import { IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useRef, useState } from '~/libs/hooks/hooks.js';
import { changeFileExtension } from '~/packages/files/files.js';

import { DefaultSettings as Default } from './libs/configs/default-settings.config.js';
import { ViewMode } from './libs/enums/enums.js';
import {
  createFileList,
  hasSingleFile,
  readFile,
} from './libs/helpers/helpers.js';
import { type CroppedImage } from './libs/hooks/libs/types/types.js';
import {
  type ExtractFileListKeys,
  type ResultOptions,
  type ViewModeT,
} from './libs/types/types.js';
import { ModalPopup } from './modal-popup.js';
import styles from './styles.module.scss';

interface ImageSelectorProperties<
  T extends FieldValues,
  K extends ExtractFileListKeys<T>,
> {
  name: K;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  inputReference?: React.MutableRefObject<HTMLInputElement | null>; // can be used to trigger the selection externally
  initialImageUrl?: string;
  width: number;
  height: number;
  className?: string;
  modalImageWidth?: number;
  modalImageHeight?: number;
  modalImageScale?: number;
  viewMode?: ViewModeT;
  resultOptions?: ResultOptions;
}

const ImageSelector = <
  T extends FieldValues,
  K extends ExtractFileListKeys<T>,
>({
  name,
  setValue,
  register,
  inputReference,
  initialImageUrl,
  width,
  height,
  modalImageWidth = Default.MODAL_SIZE,
  modalImageHeight = Default.MODAL_SIZE,
  modalImageScale = Default.INITIAL_ZOOM,
  viewMode = Default.VIEW_MODE,
  className,
  resultOptions,
}: ImageSelectorProperties<T, K>): JSX.Element => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cropDataUrl, setCropDataUrl] = useState<string>(initialImageUrl ?? '');

  const isCircular = viewMode === ViewMode.CIRCLE;

  const fallbackInputReference = useRef<HTMLInputElement | null>(null);

  const handleFileRead = useCallback((url: string) => {
    setUploadedDataUrl(url);
    setIsSelecting(true);
  }, []);

  const handleImageSelected = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (!hasSingleFile(target.files)) {
        return;
      }
      const [file] = target.files;
      setUploadedFile(file);
      readFile(file, handleFileRead);
    },
    [handleFileRead],
  );

  const handleModalClose = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleSelectImageClick = useCallback(() => {
    if (fallbackInputReference.current) {
      fallbackInputReference.current.click();
    }
  }, [fallbackInputReference]);

  const handleCropSuccess = useCallback(
    (image: CroppedImage) => {
      if (uploadedFile) {
        const inputValue = createFileList(
          image.blob,
          changeFileExtension(
            resultOptions?.overrideFilename ?? uploadedFile.name,
            resultOptions?.format ?? Default.OUTPUT_FORMAT,
          ),
        );

        setCropDataUrl(image.link);
        setValue(name, inputValue as PathValue<T, K>);
      }
      setIsSelecting(false);
    },
    [name, resultOptions, setValue, uploadedFile],
  );

  const { ref: setReactHookFormReference, ...inputReactHookFormProperties } =
    useMemo(
      () =>
        register(name, {
          onChange: handleImageSelected,
        }),
      [handleImageSelected, name, register],
    );

  const getInputReference = useCallback(
    (instance: HTMLInputElement): void => {
      if (inputReference) {
        inputReference.current = instance;
      }
      fallbackInputReference.current = instance;
      setReactHookFormReference(instance);
    },
    [inputReference, setReactHookFormReference],
  );

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <input
        ref={getInputReference}
        type="file"
        accept="image/*"
        hidden
        {...inputReactHookFormProperties}
      />
      {!inputReference && (
        <Icon
          iconName={IconName.EDIT}
          onClick={handleSelectImageClick}
          size="lg"
          className={styles.editIcon}
        />
      )}
      <img
        className={getValidClassNames(isCircular && styles.croppedImageCircle)}
        alt={`${name} preview`}
        src={cropDataUrl}
        width={width}
        height={height}
      />
      <Modal isOpen={isSelecting} isCentered onClose={handleModalClose}>
        <ModalPopup
          onSuccess={handleCropSuccess}
          imageWidth={modalImageWidth}
          imageHeight={modalImageHeight}
          initialZoom={modalImageScale}
          viewMode={viewMode}
          uploadedDataUrl={uploadedDataUrl}
          resultOptions={resultOptions}
        />
      </Modal>
    </div>
  );
};

export { ImageSelector };
export { OutputFormat, ViewMode } from './libs/enums/enums.js';
