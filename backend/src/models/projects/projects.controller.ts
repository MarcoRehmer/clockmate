import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './project.entity';
import { ProjectDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  async findAll(): Promise<Array<ProjectDto>> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProjectDto> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() projectDto: ProjectEntity): Promise<ProjectDto> {
    return await this.service.create(projectDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() projectDto: ProjectDto,
  ): Promise<ProjectDto> {
    return await this.service.update(id, projectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
