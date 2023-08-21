import { CustomerEntity } from '../customer.entity';
import { CustomerDto } from './customer.dto';

export function mapCustomerDtoToEntity(dto: CustomerDto): CustomerEntity {
  const entity = new CustomerEntity();
  entity.id = dto.id;
  entity.name = dto.name;
  entity.active = dto.active;

  return entity;
}

export function mapCustomerEntityToDto(entity: CustomerEntity): CustomerDto {
  return {
    id: entity.id,
    name: entity.name,
    active: entity.active,
  };
}
