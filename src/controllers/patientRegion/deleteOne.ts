import { Handler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

const deleteOne: Handler = async (req, res, next) => {
  try {
    const patientRegion = await db.patientRegion.getById(+req.params.id);

    if (!patientRegion) {
      return res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
    }

    await db.patientRegion.delete(+req.params.id);

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteOne;
