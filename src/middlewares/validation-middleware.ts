import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;

export const validateBody = <T>(schema: ObjectSchema<T>): ValidationMiddleware => {
  return validate(schema, "body");
};

const validate = (schema: ObjectSchema, type: "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map((value) => value.message));
    }
  };
};
