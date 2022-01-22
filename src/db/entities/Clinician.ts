/* eslint no-unused-vars: "off" */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

import Patient from './Patient';

export enum ClinicianPermissionsStatusEnum {
  basic = 'basic',
  paid = 'paid',
}

@Entity({ name: 'clinician' })
class Clinician extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'clinician_id' })
    clinicianId: number;

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
    name: 'permissions_status',
    type: 'enum',
    enum: ClinicianPermissionsStatusEnum,
    default: ClinicianPermissionsStatusEnum.basic,
    nullable: false,
  })
    permissionsStatus: ClinicianPermissionsStatusEnum;

  @OneToMany(() => Patient, (patient) => patient.clinicianId)
    patients: Patient[];
}

export default Clinician;
