import { Module } from '@nestjs/common';
import { BookingsEntity } from './bookings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsEntity])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
