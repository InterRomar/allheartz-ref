/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import PatientRegion from './PatientRegion';

@Entity({ name: 'recovery_plan' })
class RecoveryPlan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'recovery_plan_id' })
    recoveryPlanId: number;

  @Column({
    name: 'duration',
    type: 'int',
    nullable: false,
  })
    duration: number;

  @Column({
    name: 'exam_cadence',
    type: 'int',
    nullable: false,
  })
    examCadence: number;

  @Column({ type: 'int', nullable: false, name: 'patient_region_id' })
    patientRegionId: number;

  @ManyToOne(() => PatientRegion, (patientRegion) => patientRegion.patientRegionId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'patient_region_id' })
    patientRegion: PatientRegion;
}

export default RecoveryPlan;
