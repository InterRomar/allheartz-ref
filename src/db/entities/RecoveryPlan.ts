/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import Region from './Region';

@Entity({ name: 'recovery_plan' })
class RecoveryPlan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'recovery_plan_id' })
    recoveryPlanId: number;

  @Column({
    name: 'duration',
    type: 'text',
    nullable: false,
  })
    duration: number;

  @Column({
    name: 'exam_cadence',
    type: 'int',
    nullable: false,
  })
    examCadence: number;

  @Column({ type: 'int', nullable: false, name: 'region_id' })
    regionId: number;

  @ManyToOne(() => Region, (regionId) => regionId.regionId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'region_id' })
    region: Region;
}

export default RecoveryPlan;
