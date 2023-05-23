import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './models/bookings/bookings.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'clockmateUser',
      password: 'ClockMate123!',
      database: 'clockmate_dev',
      synchronize: true,
      autoLoadEntities: true,
    }),
    BookingsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
