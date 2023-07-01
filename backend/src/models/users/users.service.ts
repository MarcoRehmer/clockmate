import { UserEntity } from './user.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltOrRound = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(credentials: {
    username: string;
    password: string;
  }): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      username: credentials.username,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return Promise.resolve(
      await bcrypt.compare(credentials.password, user.password),
    );
  }

  async findAll(): Promise<ReadonlyArray<UserEntity>> {
    return this.userRepository.find();
  }

  async create(userDto: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      username: userDto.username,
    });

    if (user) {
      throw new InternalServerErrorException('User already exists');
    }

    const hash = await bcrypt.hash(userDto.password, this.saltOrRound);

    return this.userRepository.save({ ...userDto, password: hash });
  }

  update(id: number, userDto: UserEntity): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async findOne(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }
}
