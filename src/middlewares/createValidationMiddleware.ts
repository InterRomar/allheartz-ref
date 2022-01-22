import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import _ from 'lodash';

type ShapeItemType = {
  [key: string]:
  yup.BooleanSchema |
  yup.StringSchema |
  yup.NumberSchema |
  yup.DateSchema |
  yup.ObjectSchema<any> | // eslint-disable-line @typescript-eslint/no-explicit-any
  yup.ArraySchema<any> | // eslint-disable-line @typescript-eslint/no-explicit-any
  yup.ValidationError |
  yup.BaseSchema;
}

type ShapeType = {
  body?: ShapeItemType,
  params?: ShapeItemType,
  query?: ShapeItemType,
};

const createValidationMiddleware = (shape: ShapeType): Handler => {
  return async (req, res, next) => {
    try {
      const unexpectedFields: any[] = [];
      await Promise.all(Object.keys(shape).map((key) => {
        Object.keys(req[key as keyof ShapeType]).forEach((field) => {
          if (!shape && !shape[key as keyof ShapeType][field]) {
            unexpectedFields.push({
              path: `${key}.${field}`,
              message: 'Unexpected field',
              type: 'unexpected',
            });
          }
        });

        return yup
          .object()
          // @ts-ignore-next-line
          .shape(shape[key])
          .validate(req[key as keyof ShapeType], { abortEarly: false });
      }));

      if (unexpectedFields.length) {
        return res.status(StatusCodes.BAD_REQUEST).json(unexpectedFields);
      }

      next();
    } catch (err: any) {
      if (_.get(err, 'name') !== 'ValidationError') {
        return next(err);
      }

      const error = err.inner.map((validationError: unknown) => _.pick(
        validationError,
        ['path', 'message', 'type'],
      ));

      res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
};

export default createValidationMiddleware;
