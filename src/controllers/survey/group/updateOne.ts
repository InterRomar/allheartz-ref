import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type ParamType = {
  [id: string]: string
}

type BodyType = {
  name: string;
  description: string;
  surveyTopicId: number;
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const surveyGroup = await db.surveyGroup.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(surveyGroup);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
