import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  finishedAt?: Date;

  @Column({ nullable: true })
  remarks?: string;

  @Column({ nullable: true })
  projectId?: number;

  @Column()
  customerId: number;

  @Column({ nullable: true })
  activityType?: string;
}
