import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<Array<CustomerEntity>> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    return this.repository.findOneBy({ id });
  }

  async create(customerDto: CustomerEntity): Promise<CustomerEntity> {
    return this.repository.save(customerDto);
  }

  async update(
    id: number,
    customerDto: CustomerEntity,
  ): Promise<CustomerEntity> {
    const customer = await this.repository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Record not found');
    }

    const updatedRecord = { ...customer, ...customerDto };
    return this.repository.save(updatedRecord);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
