import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const createOne = {
  body: {
    regionId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    patientId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
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
    regionId: yup.number().strict(),
    patientId: yup.number().strict(),
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
