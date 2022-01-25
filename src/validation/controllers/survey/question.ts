import * as yup from 'yup';

import { SurveyAnswerTypeEnum } from 'common/db/entities/SurveyQuestion';

import { defaultQueryValidation } from '../../defaultQueryValidation';
import errorMessages from '../../errorMessages';

const createOne = {
  body: {
    question: yup.string().strict().required(errorMessages.NAME_MISSED),
    answerType: yup
      .string()
      .strict()
      .oneOf(Object.values(SurveyAnswerTypeEnum), errorMessages.ANSWER_TYPE_INVALID)
      .required(errorMessages.ANSWER_TYPE_MISSED),
    surveyGroupId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
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
    name: yup.string().strict(),
    answerType: yup
      .string()
      .strict()
      .oneOf(Object.values(SurveyAnswerTypeEnum), errorMessages.ANSWER_TYPE_INVALID),
    surveyGroupId: yup.number().strict(),
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
