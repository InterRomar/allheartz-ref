import * as yup from 'yup';
import dayjs from 'dayjs';

import { GenderEnum } from 'db/entities/Patient';

import errorMessages from './errorMessages';
import regExps from './regExps';

const emailValidation = yup.string().strict().email(errorMessages.EMAIL_INVALID);
const emailValidationRequired = emailValidation.required(errorMessages.EMAIL_MISSED);

const phoneValidation = yup.string().strict()
  .matches(regExps.phone, { message: errorMessages.PHONE_INVALID });
const phoneValidationRequired = phoneValidation.required(errorMessages.PHONE_MISSED);

const patientDateOfBirthValidation = yup.date().typeError('Invalid date')
  .test('min', errorMessages.PATIENT_DATE_OF_BIRTH_MIN, (dob) => {
    return dayjs(new Date()).diff(dob, 'years') >= 18;
  });
const patientDateOfBirthValidationRequired = patientDateOfBirthValidation
  .required(errorMessages.PATIENT_DATE_OF_BIRTH_MISSED);

const patientGenderValidation = yup.string()
  .oneOf(Object.values(GenderEnum), errorMessages.PATIENT_GENDER_INVALID);
const patientGenderValidationRequired = patientGenderValidation
  .required(errorMessages.PATIENT_GENDER_MISSED);

export default {
  email: emailValidation,
  emailRequired: emailValidationRequired,
  phone: phoneValidation,
  phoneRequired: phoneValidationRequired,
  patientDateOfBirth: patientDateOfBirthValidation,
  patientDateOfBirthRequired: patientDateOfBirthValidationRequired,
  patientGender: patientGenderValidation,
  patientGenderRequired: patientGenderValidationRequired,
};
