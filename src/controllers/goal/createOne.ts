import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { WeightOptionEnum } from 'types';

type BodyType = {
  duration: number;
  rom: number;
  weightOption?: WeightOptionEnum;
  recoveryPlanId: number;
  patientRegionId: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const goal = await db.goal.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(goal);
  } catch (err) {
    next(err);
  }
};

export default createOne;
