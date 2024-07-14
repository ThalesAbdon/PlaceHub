import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  constructor(input: Partial<PlaceEntity>) {
    Object.assign(this, input);
  }
}
