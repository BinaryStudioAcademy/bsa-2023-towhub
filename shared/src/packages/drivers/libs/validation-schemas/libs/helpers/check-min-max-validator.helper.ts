import { type CustomValidator } from 'joi';

const checkMinMaxValidator: (
  min: number,
  max: number,
  spacers: RegExp,
) => CustomValidator<string> = (min, max, spacers) => (value, helpers) => {
  const characters = value.replace(spacers, '');

  if (characters.length >= min && characters.length <= max) {
    return value;
  }

  return helpers.error('string.custom');
};

export { checkMinMaxValidator };
