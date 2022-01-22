/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

import Exam from './Exam';

@Entity({ name: 'exam_note' })
class ExamNote extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'exam_note_id' })
    examNoteId: number;

  @Column({
    name: 'note',
    type: 'text',
    nullable: false,
  })
    note: string;

  @Column({ type: 'int', nullable: false, name: 'exam_id' })
    examId: number;

  @ManyToOne(() => Exam, (exam) => exam.examId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exam_id' })
    exam: Exam;
}

export default ExamNote;
