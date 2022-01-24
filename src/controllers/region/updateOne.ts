import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { SideEnum } from 'types';

// TODO: Add unique name for each region ??
type BodyType = {
  side?: SideEnum;
  exampleVideoLink?: string;
  alignmentImgLink?: string;
  defaultPostExamSurveyType?: string;
  defaultRecoveryPlan?: string;
  jointId?: number;
  movementId?: number;
}

type ParamType = {
  [id: string]: string
}

const updateOne: Handler = async (req: Request<ParamType, unknown, BodyType>, res, next) => {
  try {
    const alignmentImgLink = '<url_placeholder>';
    const exampleVideoLink = '<url_placeholder>';

    const region = await db.region.update(+req.params.id, {
      ...req.body,
      exampleVideoLink: req.body.exampleVideoLink || exampleVideoLink,
      alignmentImgLink: req.body.alignmentImgLink || alignmentImgLink,
    });

    res.status(HTTP_STATUS_CODES.OK).json(region);
  } catch (err) {
    next(err);
  }
};

export default updateOne;
