import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  duration: number;
  examCadence: number;
  patientRegionId?: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const recoveryPlan = await db.recoveryPlan.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(recoveryPlan);
  } catch (err) {
    next(err);
  }
};

export default createOne;
