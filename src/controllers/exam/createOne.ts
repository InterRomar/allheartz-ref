import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import ExamMLResult from 'db/entities/ExamMLResult';
import ExamNote from 'db/entities/ExamNote';

type BodyType = {
  patientRegionId: number;
  paintScaleValue: number;
  outcomeScore?: number;
  examMLResult?: ExamMLResult;
  examNotes?: ExamNote[];
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const videoLink = '<url_placeholder>';
    const paintScaleImgLink = '<url_placeholder>';

    const exam = await db.exam.create({
      paintScaleValue: req.body.paintScaleValue,
      outcomeScore: req.body.outcomeScore,
      patientRegionId: req.body.patientRegionId,
      videoLink,
      paintScaleImgLink,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json(exam);
  } catch (err) {
    next(err);
  }
};

export default createOne;
