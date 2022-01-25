import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'survey_topic' })
class SurveyTopic extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'survey_topic_id' })
    surveyTopicId: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
    name: string;
}

export default SurveyTopic;
