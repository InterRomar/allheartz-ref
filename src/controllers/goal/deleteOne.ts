import { Handler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';

const deleteOne: Handler = async (req, res, next) => {
  try {
    const goal = await db.goal.getById(+req.params.id);

    if (!goal) {
      return res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
    }

    await db.goal.delete(+req.params.id);

    res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

export default deleteOne;
