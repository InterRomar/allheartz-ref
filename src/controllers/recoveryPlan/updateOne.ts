import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type ParamType = {
  [id: string]: string
}

type BodyType = {
  duration: number;
  examCadence: number;
  patientRegionId?: number;
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const recoveryPlan = await db.recoveryPlan.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(recoveryPlan);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
