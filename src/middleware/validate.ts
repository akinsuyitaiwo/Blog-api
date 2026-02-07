import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type ValidateTarget = "body" | "query" | "params";

export const validate =
  (schema: ObjectSchema, target: ValidateTarget = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false, // return all validation errors
      stripUnknown: true, // remove unknown fields
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    // Replace request data with validated value
    req[target] = value;
    next();
  };
