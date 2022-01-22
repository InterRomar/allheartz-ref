import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { GenderEnum } from 'db/entities/Patient';

type BodyType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender?: GenderEnum;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const patient = await db.patient.create({
      ...req.body,
      dateOfBirth: new Date(req.body.dateOfBirth),
    });

    res.status(HTTP_STATUS_CODES.CREATED).json(patient);
  } catch (err) {
    next(err);
  }
};

export default createOne;
