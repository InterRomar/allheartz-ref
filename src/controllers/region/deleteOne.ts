import { Handler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

const deleteOne: Handler = async (req, res, next) => {
  try {
    const region = await db.region.getById(+req.params.id);

    if (!region) {
      return res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
    }

    await db.region.delete(+req.params.id);

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteOne;
