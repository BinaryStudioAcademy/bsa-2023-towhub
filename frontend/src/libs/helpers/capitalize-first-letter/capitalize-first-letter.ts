const capitalizeFirstLetter = (string: string): string => {
  const stringWithoutUnderscores = string.replace(/_/g, ' ');

  return (
    stringWithoutUnderscores.charAt(0).toUpperCase() +
    stringWithoutUnderscores.slice(1)
  );
};

export { capitalizeFirstLetter };
