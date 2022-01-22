/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import ExamMLResult from './ExamMLResult';
import ExamNote from './ExamNote';
import PatientRegion from './PatientRegion';

@Entity({ name: 'exam' })
class Exam extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'exam_id' })
    examId: number;

  @Column({
    name: 'video_link',
    type: 'text',
    nullable: false,
  })
    videoLink: string;

  @Column({
    name: 'marked_up_video_link',
    type: 'text',
    nullable: true,
  })
    markedUpVideoLink: string;

  @Column({
    name: 'paint_scale_value',
    type: 'int',
  })
    paintScaleValue: number;

  @Column({
    name: 'paint_scale_img_link',
    type: 'text',
    nullable: true,
  })
    paintScaleImgLink: string;

  @Column({
    name: 'outcome_score',
    type: 'int',
    nullable: true,
  })
    outcomeScore: number;

  // ???
  // @Column({
  //   name: 'survey_answers',
  //   type: 'array',
  //   nullable: false,
  // })
  //   survey_answers: string;

  @Column({ type: 'int', nullable: false, name: 'patient_region_id' })
    patientRegionId: number;

  @ManyToOne(() => PatientRegion, (patientRegion) => patientRegion.patientRegionId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'patient_region_id' })
    patientRegion: PatientRegion;

  @OneToMany(() => ExamNote, (examNote) => examNote.exam)
    examNotes: ExamNote[];

  @OneToOne(() => ExamMLResult, (examMLResult) => examMLResult.examId)
    examMLResult: ExamMLResult;
}

export default Exam;
