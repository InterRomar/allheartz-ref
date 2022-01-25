import { GenderEnum } from 'db/entities/Patient';

export default {
  FIELD_IS_REQUIRED: 'Field is required',

  ID_MISSED: 'Pass record ID to params',
  NAME_MISSED: 'Enter your first name',

  FIRST_NAME_MISSED: 'Enter your first name',
  LAST_NAME_MISSED: 'Enter your last name',

  EMAIL_MISSED: 'Enter your email',
  EMAIL_INVALID: 'Invalid email',

  PHONE_MISSED: 'Enter your phone',
  PHONE_INVALID: 'Invalid phone',

  PASSWORD_MISSED: 'Enter your password',
  PASSWORD_INVALID: 'Invalid password',

  CLINICIAN_ID_MISSED: 'Clinician Id is required',

  PATIENT_GENDER_MISSED: 'Chose your gender',
  PATIENT_GENDER_INVALID: `Gender can be only one of: ${Object.values(GenderEnum).join(', ')}`,

  PATIENT_DATE_OF_BIRTH_MISSED: 'Enter your date of birth',
  PATIENT_DATE_OF_BIRTH_INVALID: 'Invalid date of birth',
  PATIENT_DATE_OF_BIRTH_MIN: 'You are too young',

  MIN_VALUE_MISSED: 'Min value is missed',
  MAX_VALUE_MISSED: 'Max value is missed',
  MIN_IMG_LINK_MISSED: 'Min image link is missed',
  MAX_IMG_LINK_MISSED: 'Max image link is missed',

  ANSWER_TYPE_INVALID: 'Answer Type is invalid',
  ANSWER_TYPE_MISSED: 'Answer Type is missed',
};
