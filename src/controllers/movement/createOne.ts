import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  name: string,
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const movement = await db.movement.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(movement);
  } catch (err) {
    next(err);
  }
};

export default createOne;
