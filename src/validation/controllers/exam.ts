import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';

const examMLResultValidation = yup.object().shape({
  minValue: yup.number().strict(),
  maxValue: yup.number().strict(),
  minImgLink: yup.string().strict(),
  maxImgLink: yup.string().strict(),
});

const examNoteValidation = yup.object().shape({
  note: yup.string().required(errorMessages.MIN_IMG_LINK_MISSED),
});

const createOne = {
  body: {
    paintScaleValue: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    outcomeScore: yup.number().strict(),
    patientRegionId: yup.number().strict().required(errorMessages.FIELD_IS_REQUIRED),
    examMLResult: examMLResultValidation,
    examNotes: yup.array(examNoteValidation),
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
    paintScaleValue: yup.number().strict(),
    outcomeScore: yup.number().strict(),
    patientRegionId: yup.number().strict(),
    examMLResult: examMLResultValidation,
    examNotes: yup.array(examNoteValidation),
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
