import { TRUCK_IMG_HEIGHT, TRUCK_IMG_WIDTH } from '../constants/constants.js';

const calculateRad = (rotationAngle: number): number => {
  return (rotationAngle * Math.PI) / 180;
};

const getHalf = (dividend: number): number => {
  return dividend / 2;
};

const rotateCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  rotationRad: number,
): void => {
  const context = canvas.getContext('2d');

  context?.translate(getHalf(canvas.width), getHalf(canvas.height));
  context?.rotate(rotationRad);
  context?.drawImage(image, -getHalf(image.width), -getHalf(image.height));
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
