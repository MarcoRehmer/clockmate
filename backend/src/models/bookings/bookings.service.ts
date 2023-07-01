import { BookingEntity } from './booking.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingsRepository: Repository<BookingEntity>,
    private readonly projectsService: ProjectsService,
    private readonly customersService: CustomersService,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<BookingEntity[]> {
    return this.bookingsRepository.find();
  }

  async findOne(id: number): Promise<BookingEntity> {
    return this.bookingsRepository.findOneBy({ id });
  }

  async create(bookingDto: BookingEntity): Promise<BookingEntity> {
    if (!bookingDto.userId) {
      throw new BadRequestException('No user given');
    }

    // set user. Throw error, if no user is given
    const user = await this.userService.findOne(bookingDto.userId);
    if (!user) {
      throw new NotFoundException('invalid userID');
    }
    bookingDto.user = user;

    // set project if given
    if (bookingDto.projectId) {
      const project = await this.projectsService.findOne(bookingDto.projectId);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      bookingDto.project = project;
    }

    // set customer if given
    if (bookingDto.customerId) {
      const customer = await this.customersService.findOne(
        bookingDto.customerId,
      );
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      bookingDto.customer = customer;
    }

    return this.bookingsRepository.save(bookingDto);
  }

  async update(id: number, bookingDto: BookingEntity): Promise<BookingEntity> {
    const booking = await this.bookingsRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Record not found');
    }
    const updatedRecord = { ...booking, ...bookingDto };
    return this.bookingsRepository.save(updatedRecord);
  }

  async delete(id: string): Promise<void> {
    await this.bookingsRepository.delete(id);
  }
}
