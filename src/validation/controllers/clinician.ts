import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';
import standardValidation from '../standardValidation';

const createOne = {
  body: {
    email: standardValidation.emailRequired,
    firstName: yup.string().strict().required(errorMessages.FIRST_NAME_MISSED),
    lastName: yup.string().strict().required(errorMessages.LAST_NAME_MISSED),
  },
};

const getOne = {
  params: {
    id: yup.number(),
  },
};

const updateOne = {
  params: {
    id: yup.number().required(errorMessages.ID_MISSED),
  },
  body: {
    email: standardValidation.email,
    firstName: yup.string().strict(),
    lastName: yup.string().strict(),
  },
};

const deleteOne = {
  params: {
    id: yup.number(),
  },
};

export default {
  getList: defaultQueryValidation,
  createOne,
  getOne,
  updateOne,
  deleteOne,
};
