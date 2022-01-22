/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

import { JointEnum, MovementTypeEnum, SideEnum } from 'types';

import Joint from './Joint';
import Movement from './Movement';

console.log(JointEnum);
@Entity({ name: 'region' })
class Region extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'region_id' })
    regionId: number;

  @Column({
    name: 'side',
    type: 'enum',
    enum: SideEnum,
    nullable: false,
  })
    side: SideEnum;

  @Column({
    name: 'movement_type',
    type: 'enum',
    enum: MovementTypeEnum,
    nullable: false,
  })
    movementType: MovementTypeEnum;

  @Column({
    name: 'alignment_img_link',
    type: 'text',
    nullable: true,
  })
    alignmentImgLink: string;

  @Column({
    name: 'example_video_link',
    type: 'text',
    nullable: false,
  })
    exampleVideoLink: string;

  // ???
  @Column({
    name: 'default_post_exam_survey_type',
    type: 'text',
    nullable: true,
  })
    defaultPostExamSurveyType: string;

  // ???
  @Column({
    name: 'default_recovery_plan',
    type: 'text',
    nullable: true,
  })
    defaultRecoveryPlan: string;

  @Column({ type: 'int', nullable: false, name: 'joint_id' })
    jointId: number;

  @ManyToOne(() => Joint, (joint) => joint.jointId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'joint_id' })
    joint: Joint;

  @Column({ type: 'int', nullable: false, name: 'movement_id' })
    movementId: number;

  @ManyToOne(() => Movement, (movement) => movement.movementId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'movement_id' })
    movement: Movement;
}

export default Region;
