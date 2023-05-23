import { BookingsEntity } from './bookings.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsEntity)
    private readonly bookingsRepository: Repository<BookingsEntity>
  ) {}

  async findAll(): Promise<BookingsEntity[]> {
    return this.bookingsRepository.find();
  }

  async findOne(id: number): Promise<BookingsEntity> {
    return this.bookingsRepository.findOneBy({ id });
  }

  async create(bookingDto: BookingsEntity): Promise<BookingsEntity> {
    return this.bookingsRepository.save(bookingDto);
  }

  async update(
    id: number,
    bookingDto: BookingsEntity
  ): Promise<BookingsEntity> {
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
