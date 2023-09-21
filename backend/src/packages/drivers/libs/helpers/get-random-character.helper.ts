const getRandomCharacter = (chars: string): string => {
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

export { getRandomCharacter };
