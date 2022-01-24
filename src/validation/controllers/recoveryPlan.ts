import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const createOne = {
  body: {
    duration: yup.number().required(errorMessages.FIELD_IS_REQUIRED),
    examCadence: yup.number().required(errorMessages.FIELD_IS_REQUIRED),
    patientRegionId: yup.number().required(errorMessages.FIELD_IS_REQUIRED),
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
    duration: yup.number(),
    examCadence: yup.number(),
    patientRegionId: yup.number(),
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
