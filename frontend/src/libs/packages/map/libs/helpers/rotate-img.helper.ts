import { TRUCK_IMG_HEIGHT, TRUCK_IMG_WIDTH } from '../constants/constants.js';

const calculateRad = (rotationAngle: number): number => {
  return (rotationAngle * Math.PI) / 180;
};

const rotateCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  rotationRad: number,
): void => {
  const context = canvas.getContext('2d');

  context?.translate(canvas.width / 2, canvas.height / 2);
  context?.rotate(rotationRad);
  context?.drawImage(image, -image.width / 2, -image.height / 2);
};

const rotateImg = (url: string, rotationAngle: number): string => {
  const canvas = document.createElement('canvas');

  canvas.width = TRUCK_IMG_WIDTH;
  canvas.height = TRUCK_IMG_HEIGHT;

  const image = new Image();
  image.src = url;

  const rotationRad = calculateRad(rotationAngle);

  rotateCanvas(canvas, image, rotationRad);

  return canvas.toDataURL();
};

export { rotateImg };
