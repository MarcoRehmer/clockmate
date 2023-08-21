import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from '../bookings/booking.entity';
import { CustomerEntity } from '../customers/customer.entity';

@Entity({ name: 'projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => CustomerEntity, customer => customer.projects)
  customer?: CustomerEntity;

  @OneToMany(() => BookingEntity, booking => booking.project)
  bookings: Array<BookingEntity>;
}
