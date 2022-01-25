import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

type BodyType = {
  name: string;
  description: string;
  surveyTopicId: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const surveyGroup = await db.surveyGroup.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(surveyGroup);
  } catch (err) {
    next(err);
  }
};

export default createOne;
