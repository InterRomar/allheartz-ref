import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  patientRegionId: number;
  patientId: number;
  regionId: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const patientRegion = await db.patientRegion.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(patientRegion);
  } catch (err) {
    next(err);
  }
};

export default createOne;
