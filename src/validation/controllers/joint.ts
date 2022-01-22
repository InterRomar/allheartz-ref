import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const createOne = {
  body: {
    name: yup.string().strict().required(errorMessages.FIELD_IS_REQUIRED),
    is_pair: yup.boolean().strict().required(errorMessages.FIELD_IS_REQUIRED),
  },
};

const getOne = {
  params: {
    id: yup.number(),
  },
};

const updateOne = {
  body: {
    name: yup.string().strict().required(errorMessages.FIELD_IS_REQUIRED),
    is_pair: yup.boolean().strict().required(errorMessages.FIELD_IS_REQUIRED),
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
