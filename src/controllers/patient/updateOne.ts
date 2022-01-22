import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { GenderEnum } from 'db/entities/Patient';

type ParamType = {
  [id: string]: string
}

type BodyType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender?: GenderEnum;
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const patient = await db.patient.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(patient);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
