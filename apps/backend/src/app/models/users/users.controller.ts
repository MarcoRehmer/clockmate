import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserDtoWithPassword } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    return this.service.login(credentials);
  }

  @Get()
  findAll(): Promise<ReadonlyArray<UserDto>> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() userDto: UserDtoWithPassword): Promise<UserDto> {
    return this.service.create(userDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userDto: UserDtoWithPassword,
  ): Promise<UserDto> {
    return this.service.update(id, userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
