import * as yup from 'yup';

import { defaultQueryValidation } from '../defaultQueryValidation';
import errorMessages from '../errorMessages';
import standardValidation from '../standardValidation';

const createOne = {
  body: {
    email: standardValidation.emailRequired,
    firstName: yup.string().strict().required(errorMessages.FIRST_NAME_MISSED),
    lastName: yup.string().strict().required(errorMessages.LAST_NAME_MISSED),
    phoneNumber: standardValidation.phoneRequired,
    dateOfBirth: standardValidation.patientDateOfBirthRequired,
    gender: standardValidation.patientGender,
    clinicianId: yup.number().required(errorMessages.CLINICIAN_ID_MISSED),
  },
};

const getOne = {
  params: {
    id: yup.number(),
  },
};

const updateOne = {
  body: {
    email: standardValidation.email,
    firstName: yup.string().strict(),
    lastName: yup.string().strict(),
    phoneNumber: standardValidation.phone,
    gamingId: yup.number().strict().nullable(),
    dateOfBirth: standardValidation.patientDateOfBirthRequired,
    gender: standardValidation.patientGender,
    clinicianId: yup.number().required(errorMessages.CLINICIAN_ID_MISSED),
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
