import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './models/bookings/bookings.module';
import { UsersModule } from './models/users/users.module';
import { ProjectsModule } from './models/projects/projects.module';
import { CustomersModule } from './models/customers/customers.module';

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
    ProjectsModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
