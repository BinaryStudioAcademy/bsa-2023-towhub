import { Button } from '~/libs/components/components.js';
import { useCallback, useRef } from '~/libs/hooks/hooks.js';

import { useImageCropper } from './libs/hooks/hooks.js';
import { type CroppedImage } from './libs/hooks/libs/types/types.js';
import { type ResultOptions, type ViewModeT } from './libs/types/types.js';
import styles from './styles.module.scss';

type ModalPopupProperties = {
  onSuccess: (image: CroppedImage) => void;
  imageWidth: number;
  imageHeight: number;
  initialZoom: number;
  viewMode: ViewModeT;
  uploadedDataUrl: string | null;
  resultOptions?: ResultOptions;
};

const ModalPopup = ({
  onSuccess,
  imageWidth,
  imageHeight,
  initialZoom,
  viewMode,
  uploadedDataUrl,
  resultOptions,
}: ModalPopupProperties): JSX.Element => {
  const cropHolderReference = useRef<React.ElementRef<'div'>>(null);

  const { getCroppedImage } = useImageCropper({
    imageUrl: uploadedDataUrl,
    width: imageWidth,
    height: imageHeight,
    initialZoom,
    viewMode,
    cropHolderReference: cropHolderReference,
  });

  const handleImageApply = useCallback(() => {
    void getCroppedImage(resultOptions).then((croppedImage) => {
      if (croppedImage) {
        onSuccess(croppedImage);
      }
    });
  }, [getCroppedImage, onSuccess, resultOptions]);

  return (
    <div className={styles.modalContent}>
      <div className={styles.image} ref={cropHolderReference} />
      <p className={styles.tooltip}>Use mouse to pan and zoom</p>
      <Button
        className={styles.modalButton}
        label="Apply"
        onClick={handleImageApply}
      />
    </div>
  );
};

export { ModalPopup };
