import { Module } from '@nestjs/common';
import { BookingEntity } from './booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { ProjectsModule } from '../projects/projects.module';
import { CustomersModule } from '../customers/customers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    CustomersModule,
    ProjectsModule,
    UsersModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
