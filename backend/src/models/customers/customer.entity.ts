import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from '../projects/project.entity';
import { BookingEntity } from '../bookings/booking.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => ProjectEntity, project => project.customer)
  projects: Array<ProjectEntity>;

  @OneToMany(() => BookingEntity, booking => booking.customer)
  bookings: Array<BookingEntity>;
}
