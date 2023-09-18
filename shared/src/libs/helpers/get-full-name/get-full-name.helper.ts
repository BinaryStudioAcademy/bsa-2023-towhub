const WORDS_DELIMITER = ' ';

const getFullName = (...nameParts: string[]): string => {
  return nameParts.join(WORDS_DELIMITER);
};

export { getFullName };
