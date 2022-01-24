import * as yup from 'yup';

import { WeightOptionEnum } from 'types';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const createOne = {
  body: {
    duration: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    rom: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    weightOption: yup.mixed().oneOf(Object.values(WeightOptionEnum)),
    recoveryPlanId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    patientRegionId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
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
    duration: yup.number().strict(),
    rom: yup.number().strict(),
    weightOption: yup.mixed().oneOf(Object.values(WeightOptionEnum)),
    recoveryPlanId: yup.number().strict(),
    patientRegionId: yup.number().strict(),
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
