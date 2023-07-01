import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  async findAll(): Promise<Array<CustomerEntity>> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CustomerEntity> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() customerDto: CustomerEntity): Promise<CustomerEntity> {
    console.log(customerDto);
    return await this.service.create(customerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() customerDto: CustomerEntity,
  ): Promise<CustomerEntity> {
    return await this.service.update(id, customerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
