import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookingEntity } from './booking.entity';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get()
  async findAll(): Promise<Array<BookingEntity>> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BookingEntity> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() bookingDto: BookingEntity): Promise<BookingEntity> {
    return await this.service.create(bookingDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() bookingDto: BookingEntity,
  ): Promise<BookingEntity> {
    return await this.service.update(id, bookingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
