import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type ParamType = {
  [id: string]: string
}

const getOne: Handler = async (req: Request<ParamType, unknown, unknown>, res, next) => {
  try {
    const exam = await db.exam.getById(+req.params.id);

    if (!exam) {
      return res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
    }

    res.status(HTTP_STATUS_CODES.OK).json(exam);
  } catch (err) {
    next(err);
  }
};

export default getOne;
