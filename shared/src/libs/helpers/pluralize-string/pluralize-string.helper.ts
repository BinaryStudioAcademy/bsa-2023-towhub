const pluralizeString = (base: string, quantity: number): string =>
  `${base}${quantity > 1 ? 's' : ''}`;

export { pluralizeString };
