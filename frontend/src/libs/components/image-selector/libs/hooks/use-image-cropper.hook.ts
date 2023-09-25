import 'croppie/croppie.css';

import Croppie from 'croppie';

import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { DefaultSettings, ImageFormat } from '../enums/enums.js';
import { type ResultOptions } from '../types/types.js';
import { canAttachCropper, scaleSize } from './libs/helpers/helpers.js';
import {
  type HookProperties,
  type HookReturnType,
} from './libs/types/use-image-cropper.types.js';

const createCropper = (
  container: HTMLDivElement,
  {
    viewMode,
    height,
    initialZoom,
    width,
  }: Pick<HookProperties, 'width' | 'height' | 'initialZoom' | 'viewMode'>,
): Croppie => {
  return new Croppie(container, {
    enableExif: true,
    viewport: {
      ...scaleSize(width, height, initialZoom),
      type: viewMode,
    },
    boundary: { width, height },
  });
};

const useImageCropper = ({
  width,
  height,
  initialZoom,
  viewMode,
  cropHolderReference,
  imageAsDataUrl,
}: HookProperties): HookReturnType => {
  const [cropper, setCropper] = useState<Croppie | undefined>();

  useEffect(() => {
    if (!canAttachCropper(cropHolderReference.current)) {
      return;
    }

    const instance = createCropper(cropHolderReference.current, {
      width,
      height,
      initialZoom,
      viewMode,
    });
    setCropper(instance);

    return () => {
      instance.destroy();
    };
  }, [cropHolderReference, viewMode, height, initialZoom, width]);

  useEffect(() => {
    if (cropper && imageAsDataUrl) {
      void cropper.bind({ url: imageAsDataUrl, zoom: 0 });
    }
  }, [cropper, imageAsDataUrl]);

  const getCroppedImage = useCallback(
    async (options?: ResultOptions) => {
      if (!cropper) {
        return;
      }

      const intermediate: ResultOptions = {
        size: { width, height },
        format: DefaultSettings.OUTPUT_FORMAT,
        circle: DefaultSettings.VIEW_MODE === 'circle',
        ...options,
      };

      return {
        link: await cropper.result({
          ...intermediate,
          type: ImageFormat.BASE64,
        }),
        blob: await cropper.result({
          ...intermediate,
          type: ImageFormat.BLOB,
        }),
      };
    },
    [cropper, height, width],
  );

  return { getCroppedImage };
};

export { useImageCropper };
