import { Handler, Request } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import db from 'db';
import { DefaultQueryType } from 'validation/defaultQueryValidation';

type ModifiedRequest = Request<unknown, unknown, unknown, DefaultQueryType>
const getList: Handler = async (req: ModifiedRequest, res, next) => {
  try {
    const query = {
      pagination: {
        page: req.query.page || '',
        perPage: req.query.perPage || '',
      },
      sort: {
        sortBy: req.query.sortBy || '',
        sortDirection: req.query.sortDirection || 'straight',
      },
    };

    const paginatedData = await db.surveyGroup.findAndCount(query);

    res.status(HTTP_STATUS_CODES.OK).json(paginatedData);
  } catch (err) {
    next(err);
  }
};

export default getList;
