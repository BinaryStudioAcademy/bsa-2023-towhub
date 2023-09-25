import 'croppie/croppie.css';

import React from 'react';
import {
  type FieldValues,
  type PathValue,
  type UseFormSetValue,
} from 'react-hook-form';

import { Icon, Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useRef, useState } from '~/libs/hooks/hooks.js';
import { changeFileExtension } from '~/packages/files/files.js';

import { DefaultSettings as Default } from './libs/enums/default-settings.enum.js';
import {
  convertFormatToMimetype,
  createFileList,
  hasSingleFile,
  readFile,
} from './libs/helpers/helpers.js';
import { type CroppedImage } from './libs/hooks/libs/types/types.js';
import {
  type ExtractFileListKeys,
  type ResultOptions,
  type ViewMode,
} from './libs/types/types.js';
import { ModalPopup } from './modal-popup.js';
import styles from './styles.module.scss';

interface ImageSelectorProperties<
  T extends FieldValues,
  K extends ExtractFileListKeys<T>,
> {
  name: K;
  setValue: UseFormSetValue<T>;
  initialImageUrl?: string;
  width: number;
  height: number;
  className?: string;
  modalImageWidth?: number;
  modalImageHeight?: number;
  modalImageScale?: number;
  viewMode?: ViewMode;
  resultOptions?: ResultOptions;
}

const ImageSelector = <
  T extends FieldValues,
  K extends ExtractFileListKeys<T>,
>({
  name,
  setValue,
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

  const inputReference = useRef<React.ElementRef<'input'>>(null);

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
    if (inputReference.current) {
      inputReference.current.click();
    }
  }, []);

  const handleCropSuccess = useCallback(
    (image: CroppedImage | undefined) => {
      if (uploadedFile && image) {
        setCropDataUrl(image.link);
        setIsSelecting(false);

        const fileName = resultOptions?.overrideFilename ?? uploadedFile.name;

        const fileList = createFileList(
          image.blob,
          changeFileExtension(
            fileName,
            resultOptions?.format ?? Default.OUTPUT_FORMAT,
          ),
          resultOptions?.format
            ? convertFormatToMimetype(resultOptions.format)
            : uploadedFile.type,
        );
        setValue(name, fileList as PathValue<T, K>);
      }
    },
    [name, resultOptions, setValue, uploadedFile],
  );

  const isCircular = viewMode === 'circle';

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <input
        ref={inputReference}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageSelected}
        hidden
      />
      <Icon
        iconName="edit"
        onClick={handleSelectImageClick}
        size="lg"
        className={styles.editIcon}
      />
      <img
        className={isCircular ? styles.croppedImageCircle : undefined}
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
