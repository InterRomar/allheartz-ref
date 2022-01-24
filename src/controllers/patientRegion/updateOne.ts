import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  patientRegionId?: number;
  patientId?: number;
  regionId?: number;
}

type ParamType = {
  [id: string]: string
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const patientRegion = await db.patientRegion.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(patientRegion);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
