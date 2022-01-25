import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import { WeightOptionEnum } from 'types';

import PatientRegion from './PatientRegion';
import RecoveryPlan from './RecoveryPlan';

@Entity({ name: 'goal' })
class Goal extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'goal_id' })
    goalId: number;

  @Column({
    name: 'duration',
    type: 'text',
    nullable: false,
  })
    duration: number; // value in days

  @Column({
    name: 'weight_option',
    type: 'enum',
    enum: WeightOptionEnum,
    default: WeightOptionEnum.none,
  })
    weightOption: WeightOptionEnum;

  @Column({
    name: 'rom',
    type: 'int',
    nullable: false,
  })
    rom: number; // range of motion: ;

  @Column({ type: 'int', nullable: false, name: 'recovery_plan_id' })
    recoveryPlanId: number;

  @ManyToOne(() => RecoveryPlan, (recoveryPlan) => recoveryPlan.recoveryPlanId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'recovery_plan_id' })
    recoveryPlan: RecoveryPlan;

  @Column({ type: 'int', nullable: false, name: 'patient_region_id' })
    patientRegionId: number;

  @ManyToOne(() => PatientRegion, (patientRegion) => patientRegion.patientRegionId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'patient_region_id' })
    patientRegion: PatientRegion;
}

export default Goal;
