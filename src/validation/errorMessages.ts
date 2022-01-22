import { GenderEnum } from 'db/entities/Patient';

export default {
  FIELD_IS_REQUIRED: 'Field is required',
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
};
