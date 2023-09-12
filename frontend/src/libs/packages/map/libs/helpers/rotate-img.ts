const TRUCK_IMG_WIDTH = 146;
const TRUCK_IMG_HEIGHT = 168;

const rotateImg = (url: string, degrees: number): string => {
  const canvas = document.createElement('canvas');

  canvas.width = TRUCK_IMG_WIDTH;
  canvas.height = TRUCK_IMG_HEIGHT;

  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = url;

  const rotationAngle = degrees;
  const rotationRad = (rotationAngle * Math.PI) / 180;

  context?.translate(canvas.width / 2, canvas.height / 2);
  context?.rotate(rotationRad);
  context?.drawImage(img, -img.width / 2, -img.height / 2);

  return canvas.toDataURL();
};

export { rotateImg };
