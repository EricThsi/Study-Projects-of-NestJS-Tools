import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({
    username,
    password,
    role,
  }: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      username,
      password,
      role,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.save(dto);

    return {
      ...newUser,
    };
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = await this.userRepository.findOne(id);

    const updatedUser = {
      userToUpdate,
      ...dto,
    };

    return await this.userRepository.save(updatedUser);
  }
}
