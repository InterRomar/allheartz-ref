import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { SurveyAnswerTypeEnum } from 'common/db/entities/SurveyQuestion';

type BodyType = {
  question: string;
  answerType: SurveyAnswerTypeEnum;
  surveyGroupId: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const surveyQuestion = await db.surveyQuestion.create(req.body);

    res.status(HTTP_STATUS_CODES.CREATED).json(surveyQuestion);
  } catch (err) {
    next(err);
  }
};

export default createOne;
