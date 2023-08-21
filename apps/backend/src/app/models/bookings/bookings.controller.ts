import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDto } from './booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get()
  async findAll(): Promise<Array<BookingDto>> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BookingDto> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() bookingDto: BookingDto): Promise<BookingDto> {
    return await this.service.create(bookingDto);
  }

  @Post('start')
  async start(): Promise<void> {
    console.log('started');
  }

  @Post('stop')
  async stop(): Promise<void> {
    console.log('stopped');
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() bookingDto: BookingDto,
  ): Promise<BookingDto> {
    return await this.service.update(id, bookingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
