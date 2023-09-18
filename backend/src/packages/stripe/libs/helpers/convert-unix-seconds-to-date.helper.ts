const convertUnixSecondsToDate = (seconds: number): Date => {
  return new Date(seconds * 1000);
};

export { convertUnixSecondsToDate };
