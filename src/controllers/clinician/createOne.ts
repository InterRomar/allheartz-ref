import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  email: string;
  firstName: string;
  lastName: string;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const clinician = await db.clinician.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(clinician);
  } catch (err) {
    next(err);
  }
};

export default createOne;
