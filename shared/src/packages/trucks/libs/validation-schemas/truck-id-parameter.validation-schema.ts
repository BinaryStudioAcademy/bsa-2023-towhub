import joi from 'joi';

const truckIdParameterValidationSchema = joi.object({
  id: joi.number().required(),
});

export { truckIdParameterValidationSchema };
