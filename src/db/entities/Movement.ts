import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'movement' })
class Movement extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'movement_id' })
    movementId: number;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
    name: string;
}

export default Movement;
