import * as yup from 'yup';

import { SideEnum } from 'types';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const createOne = {
  body: {
    side: yup.mixed().oneOf(Object.values(SideEnum)).required(errorMessages.FIELD_IS_REQUIRED),
    exampleVideoLink: yup.string().strict(),
    defaultPostExamSurveyType: yup.string().strict(),
    defaultRecoveryPlan: yup.string().strict(),
    jointId: yup.number().required(errorMessages.FIELD_IS_REQUIRED).strict(),
    movementId: yup.number().required(errorMessages.FIELD_IS_REQUIRED).strict(),
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
    side: yup.mixed().oneOf(Object.values(SideEnum)),
    exampleVideoLink: yup.string().strict(),
    defaultPostExamSurveyType: yup.string().strict(),
    defaultRecoveryPlan: yup.string().strict(),
    jointId: yup.number().strict(),
    movementId: yup.number().strict(),
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
