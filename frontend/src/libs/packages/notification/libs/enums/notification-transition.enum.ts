import { Bounce, Flip, Slide, Zoom } from 'react-toastify';

const NotificationTransition = {
  BOUNCE: Bounce,
  FLIP: Flip,
  SLIDE: Slide,
  ZOOM: Zoom,
} as const;

export { NotificationTransition };
