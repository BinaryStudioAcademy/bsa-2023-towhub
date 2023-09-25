const scaleSize = (
  width: number,
  height: number,
  scale: number,
): { width: number; height: number } => {
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

export { scaleSize };
