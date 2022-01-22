/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

import Clinician from './Clinician';

export enum GenderEnum {
  male = 'male',
  female = 'female',
}

@Entity({ name: 'patient' })
class Patient extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'patient_id' })
    patientId: number;

  @Column({
    name: 'first_name',
    type: 'text',
    nullable: true,
  })
    firstName: string;

  @Column({
    name: 'last_name',
    type: 'text',
    nullable: true,
  })
    lastName: string;

  @Column({
    type: 'text',
    name: 'email',
    unique: true,
    nullable: false,
  })
    email: string;

  @Column({
    name: 'phone_number',
    type: 'text',
    unique: true,
  })
    phoneNumber: string;

  @Column({
    name: 'date_of_birth',
    type: 'timestamp',
    nullable: true,
  })
    dateOfBirth: Date;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: GenderEnum,
    nullable: true,
  })
    gender: GenderEnum;

  @Column({ type: 'int', nullable: false, name: 'clinician_id' })
    clinicianId: number;

  @ManyToOne(() => Clinician, (clinician) => clinician.clinicianId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'clinician_id' })
    clinician: Clinician;
}

export default Patient;
