const getRandomCharacter = (chars: string): string =>
  chars.charAt(Math.floor(Math.random() * chars.length));

export { getRandomCharacter };
