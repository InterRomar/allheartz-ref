import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { SurveyAnswerTypeEnum } from 'common/db/entities/SurveyQuestion';

type ParamType = {
  [id: string]: string;
}

type BodyType = {
  question: string;
  answerType: SurveyAnswerTypeEnum;
  surveyGroupId: number;
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const surveyQuestion = await db.surveyQuestion.update(+req.params.id, req.body);

    res.status(HTTP_STATUS_CODES.OK).json(surveyQuestion);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
