import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
    private readonly customerService: CustomersService,
  ) {}

  async findAll(): Promise<Array<ProjectEntity>> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<ProjectEntity> {
    return this.repository.findOneBy({ id });
  }

  async create(projectDto: ProjectDto): Promise<ProjectEntity> {
    const project = this.repository.create();

    if (projectDto.customerId) {
      const customer = await this.customerService.findOne(
        projectDto.customerId,
      );
      if (!customer) {
        throw new NotFoundException( // TODO: find better exception
          `Customer with id ${projectDto.customerId} not found`,
        );
      }

      project.customer = customer;
    }

    return this.repository.save(projectDto);
  }

  async update(id: number, projectDto: ProjectDto): Promise<ProjectEntity> {
    const project = await this.repository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const updatedRecord = { ...project, ...projectDto };

    // TODO update customer, if id is given or changed
    return this.repository.save(updatedRecord);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
