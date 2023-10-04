import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from '../customers/customer.entity';
import { ProjectEntity } from '../projects/project.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  finishedAt?: Date;

  @Column({ nullable: true })
  remarks?: string;

  @Column({ nullable: true })
  activityType?: string;

  @ManyToOne(() => UserEntity, user => user.bookings)
  user: UserEntity;
  userId: number; // TODO: must be set by user ID given in JWT

  @ManyToOne(() => ProjectEntity, project => project.bookings)
  project?: ProjectEntity;
  projectId?: number; // TODO: noch in DTO auslagern

  @ManyToOne(() => CustomerEntity, project => project.bookings)
  customer?: CustomerEntity;
  customerId?: number; // TODO: noch in DTO auslagern
}
