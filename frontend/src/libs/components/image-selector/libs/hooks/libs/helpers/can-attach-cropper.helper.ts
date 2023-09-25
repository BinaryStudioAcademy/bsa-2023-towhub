import { CROPPIE_CONTAINER_SIGNATURE } from '../consts/croppie-container-signature.const.js';

const canAttachCropper = (
  container: HTMLDivElement | null,
): container is HTMLDivElement => {
  return (
    !!container && !container.classList.contains(CROPPIE_CONTAINER_SIGNATURE)
  );
};

export { canAttachCropper };
