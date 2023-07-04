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
import { BookingDto } from './booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingsRepository: Repository<BookingEntity>,
    private readonly projectsService: ProjectsService,
    private readonly customersService: CustomersService,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<Array<BookingDto>> {
    return this.bookingsRepository.find();
  }

  async findOne(id: number): Promise<BookingDto> {
    return this.bookingsRepository.findOneBy({ id });
  }

  async create(bookingDto: BookingDto): Promise<BookingDto> {
    if (!bookingDto.userId) {
      throw new BadRequestException('No user given');
    }

    const booking = await this.bookingsRepository.create();

    // set user. Throw error, if no user is given
    const user = await this.userService.findOne(bookingDto.userId);
    if (!user) {
      throw new NotFoundException('invalid userID');
    }
    booking.user = user;

    // set project if given
    if (bookingDto.projectId) {
      const project = await this.projectsService.findOne(bookingDto.projectId);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      booking.project = project;
    }

    // set customer if given
    if (bookingDto.customerId) {
      const customer = await this.customersService.findOne(
        bookingDto.customerId,
      );
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      booking.customer = customer;
    }

    return this.bookingsRepository.save(bookingDto);
  }

  async update(id: number, bookingDto: BookingDto): Promise<BookingDto> {
    const booking = await this.bookingsRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    const updatedBooking = { ...booking, ...bookingDto };
    return this.bookingsRepository.save(updatedBooking);
  }

  async delete(id: string): Promise<void> {
    await this.bookingsRepository.delete(id);
  }
}
