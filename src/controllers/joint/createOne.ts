import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  name: string,
  isPair: boolean,
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const joint = await db.joint.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(joint);
  } catch (err) {
    next(err);
  }
};

export default createOne;
