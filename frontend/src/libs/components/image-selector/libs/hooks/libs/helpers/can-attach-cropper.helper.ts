import { CROPPIE_CONTAINER_SIGNATURE } from '../constants/croppie-container-signature.constant.js';

const checkCanAttachCropper = (
  container: HTMLDivElement | null,
): container is HTMLDivElement => {
  return (
    !!container && !container.classList.contains(CROPPIE_CONTAINER_SIGNATURE)
  );
};

export { checkCanAttachCropper };
