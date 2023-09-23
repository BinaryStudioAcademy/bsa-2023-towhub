import truckImg from '~/assets/img/tow-truck-small.svg';

import {
  TRUCK_IMG_ANCHOR_X,
  TRUCK_IMG_ANCHOR_Y,
  TRUCK_IMG_HEIGHT,
  TRUCK_IMG_SCALE,
  TRUCK_IMG_WIDTH,
} from '../constants/constants.js';
import { type Icon } from '../types/types.js';
import { rotateImg } from './helpers.js';

const createIcon = (isOrigin: boolean, angle: number): string | Icon => {
  const rotatedIconUrl = rotateImg(truckImg, angle);

  return isOrigin
    ? {
        url: rotatedIconUrl,
        anchor: new google.maps.Point(TRUCK_IMG_ANCHOR_X, TRUCK_IMG_ANCHOR_Y),
        size: new google.maps.Size(TRUCK_IMG_WIDTH, TRUCK_IMG_HEIGHT),
        scale: TRUCK_IMG_SCALE,
      }
    : truckImg;
};

export { createIcon };
