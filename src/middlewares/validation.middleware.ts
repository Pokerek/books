import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpException } from '../errors';

const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const { details } = error;
      const message = details
        .map((i: any) => i.message)
        .join(',')
        .replaceAll('"', '');
      next(new HttpException(422, message));
    }

    req.body = value;
    next();
  };
};

export default validationMiddleware;
