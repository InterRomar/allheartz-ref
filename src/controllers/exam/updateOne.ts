import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import ExamMLResult from 'db/entities/ExamMLResult';
import ExamNote from 'common/db/entities/ExamNote';

type ParamType = {
  [id: string]: string
}

type BodyType = {
  patientRegionId: number;
  paintScaleValue: number;
  outcomeScore?: number;
  examMLResult?: ExamMLResult;
  examNotes: ExamNote[];
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const videoLink = '<url_placeholder>';
    const paintScaleImgLink = '<url_placeholder>';
    const markedUpVideoLink = '<url_placeholder>';

    const exam = await db.exam.update(+req.params.id, {
      paintScaleValue: req.body.paintScaleValue,
      outcomeScore: req.body.outcomeScore,
      patientRegionId: req.body.patientRegionId,
      videoLink,
      paintScaleImgLink,
      markedUpVideoLink,
    });

    res.status(HTTP_STATUS_CODES.OK).json(exam);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
