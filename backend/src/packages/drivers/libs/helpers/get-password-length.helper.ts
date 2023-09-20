const getPasswordLength = (maxLength: number, minLength: number): number =>
  Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

export { getPasswordLength };
