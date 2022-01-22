/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import Exam from './Exam';

@Entity({ name: 'exam_ml_result' })
class ExamMLResult extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'exam_ml_result_id' })
    examMLResultId: number;

  @Column({
    name: 'min_value',
    type: 'int',
    nullable: false,
  })
    minValue: number;

  @Column({
    name: 'max_value',
    type: 'int',
    nullable: false,
  })
    maxValue: number;

  @Column({
    name: 'min_img_link',
    type: 'text',
    nullable: false,
  })
    minImgLink: string;

  @Column({
    name: 'max_img_link',
    type: 'text',
    nullable: false,
  })
    maxImgLink: string;

  @Column({ type: 'int', nullable: false, name: 'exam_id' })
    examId: number;

  @OneToOne(() => Exam, (exam) => exam.examId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exam_id' })
    exam: Exam;
}

export default ExamMLResult;
