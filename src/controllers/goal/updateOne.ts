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

type ParamType = {
  [id: string]: string
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const goal = await db.goal.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(goal);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
