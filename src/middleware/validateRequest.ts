import type { Request, Response, NextFunction } from 'express';
import type { Schema } from 'joi';

const validateRequest =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    next();
  };

export default validateRequest;
