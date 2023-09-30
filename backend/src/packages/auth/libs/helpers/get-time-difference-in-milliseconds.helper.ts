const getTimeDifferenceInMilliseconds = (
  firstTime: number,
  secondTime: number,
): number => {
  return Math.abs(firstTime - secondTime);
};

export { getTimeDifferenceInMilliseconds };
