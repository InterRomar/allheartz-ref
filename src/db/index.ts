import BaseService from './services/BaseService';

import Patient from './entities/Patient';
import Clinician from './entities/Clinician';
import Exam from './entities/Exam';
import ExamMLResult from './entities/ExamMLResult';
import ExamNote from './entities/ExamNote';
import Goal from './entities/Goal';
import PatientRegion from './entities/PatientRegion';
import RecoveryPlan from './entities/RecoveryPlan';
import Region from './entities/Region';
import Joint from './entities/Joint';
import Movement from './entities/Movement';

export type ServiceType<Entity> = BaseService<Entity>

export default {
  patient: new BaseService(Patient),
  clinician: new BaseService(Clinician),
  exam: new BaseService(Exam),
  examMLResult: new BaseService(ExamMLResult),
  examNote: new BaseService(ExamNote),
  goal: new BaseService(Goal),
  patientRegion: new BaseService(PatientRegion),
  recoveryPlan: new BaseService(RecoveryPlan),
  region: new BaseService(Region),
  joint: new BaseService(Joint),
  movement: new BaseService(Movement),
};

// total model count: 11
