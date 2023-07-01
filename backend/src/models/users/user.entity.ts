import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingEntity } from '../bookings/booking.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  role: 'user' | 'admin';

  @OneToMany(() => BookingEntity, booking => booking.user)
  bookings: Array<BookingEntity>;
}
