import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import SurveyTopic from './SurveyTopic';

@Entity({ name: 'survey_group' })
class SurveyGroup extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'survey_group_id' })
    surveyGroupId: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
    name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true, // to clarify
  })
    description: string;

  @Column({ type: 'int', nullable: false, name: 'survery_topic_id' })
    surveyTopicId: number;

  @ManyToOne(() => SurveyTopic, (surveyTopic) => surveyTopic.surveyTopicId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'survery_topic_id' })
    surveyTopic: SurveyTopic;
}

export default SurveyGroup;
