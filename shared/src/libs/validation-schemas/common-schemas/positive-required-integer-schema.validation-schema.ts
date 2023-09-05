import joi from 'joi';

const positiveRequiredIntegerSchema = (message: string): joi.NumberSchema =>
  joi.number().integer().positive().required().messages({
    'number': message,
  });

export { positiveRequiredIntegerSchema };
