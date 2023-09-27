import { type ObjectDimensions } from '../types/types.js';

const scaleSize = (
  width: number,
  height: number,
  scale: number,
): ObjectDimensions => {
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

export { scaleSize };
