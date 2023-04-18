import Joi from 'joi';

const bookAddSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required().max(13)
});

const bookUpdateSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  isbn: Joi.string().max(13)
});

export { bookAddSchema, bookUpdateSchema };
