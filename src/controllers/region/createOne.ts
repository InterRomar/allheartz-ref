import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { SideEnum } from 'types';

type BodyType = {
  side: SideEnum;
  exampleVideoLink?: string;
  defaultPostExamSurveyType?: string;
  defaultRecoveryPlan?: string;
  jointId: number;
  movementId: number;
}

const createOne: Handler = async (req: Request<unknown, unknown, BodyType>, res, next) => {
  try {
    const alignmentImgLink = '<url_placeholder>';
    const exampleVideoLink = '<url_placeholder>';

    const region = await db.region.create({
      ...req.body,
      exampleVideoLink: req.body.exampleVideoLink || exampleVideoLink,
      alignmentImgLink,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json(region);
  } catch (err) {
    next(err);
  }
};

export default createOne;
