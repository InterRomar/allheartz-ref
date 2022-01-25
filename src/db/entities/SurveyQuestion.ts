/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import SurveyGroup from './SurveyGroup';

export enum SurveyAnswerTypeEnum {
  periodicity = 'periodicity',
}

@Entity({ name: 'survey_question' })
class SurveyQuestion extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'survey_question_id' })
    surveyQuestionId: number;

  @Column({
    name: 'question',
    type: 'varchar',
    nullable: false,
  })
    question: string;

  @Column({
    name: 'answer_type',
    type: 'enum',
    enum: SurveyAnswerTypeEnum,
    nullable: false,
    default: SurveyAnswerTypeEnum.periodicity,
  })
    answerType: SurveyAnswerTypeEnum;

  @Column({ type: 'int', nullable: false, name: 'survey_group_id' })
    surveyGroupId: number;

  @ManyToOne(() => SurveyGroup, (surveryGroup) => surveryGroup.surveyGroupId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'survery_group_id' })
    surveryGroup: SurveyGroup;
}

export default SurveyQuestion;
