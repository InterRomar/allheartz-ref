/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import Patient from './Patient';
import Region from './Region';

@Entity({ name: 'patient_region' })
class PatientRegion extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'patient_region_id' })
    patientRegionId: number;

  @Column({ type: 'int', nullable: false, name: 'patient_id' })
    patientId: number;

  @ManyToOne(() => Patient, (patient) => patient.patientId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'patient_id' })
    patient: Patient;

  @Column({ type: 'int', nullable: false, name: 'region_id' })
    regionId: number;

  @ManyToOne(() => Region, (region) => region.regionId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'region_id' })
    region: Region;
}

export default PatientRegion;
