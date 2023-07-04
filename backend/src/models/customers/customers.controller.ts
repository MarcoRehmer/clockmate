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
import { CustomerDto } from './types/customer.dto';
import { mapCustomerEntityToDto } from './types/map-customer-dto-to-entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  async findAll(): Promise<Array<CustomerDto>> {
    return (await this.service.findAll()).map(entity =>
      mapCustomerEntityToDto(entity),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CustomerDto> {
    return mapCustomerEntityToDto(await this.service.findOne(id));
  }

  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    console.log(customerDto);
    return mapCustomerEntityToDto(await this.service.create(customerDto));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() customerDto: CustomerDto,
  ): Promise<CustomerDto> {
    return mapCustomerEntityToDto(await this.service.update(id, customerDto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
