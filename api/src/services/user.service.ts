import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { hashPassword } from '../utils/user.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const hashedPassword = await hashPassword(password);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async getProfile(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    await this.userRepository.update({ id: userId }, updateUserDto);
    return await this.userRepository.findOne({ id: userId });
  }

  async deleteProfile(userId: number): Promise<void> {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }
}