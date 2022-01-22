import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'joint' })
class Joint extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'joint_id' })
    jointId: number;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
    name: string;

  @Column({
    name: 'is_pair',
    type: 'boolean',
    nullable: false,
    default: true,
  })
    has_pair: boolean;
}

export default Joint;
