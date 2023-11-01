import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schema/user.schema';
import { CreateUserDto } from './Dtos/create_user.dto';
import { DuplicateUserException } from 'src/exxceptions/duplicated.exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepo: Model<User>) {}

  async createUser(UserData: CreateUserDto) {
    try {
      const createdUser = await this.userRepo.create(UserData);
      if (!createdUser) {
        throw new DuplicateUserException(UserData.email);
      }
      return {
        message: 'User Created',
        data: {
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
        },
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new DuplicateUserException(
          `User with the email ${UserData.email} already exists.`,
        );
      }
      throw new Error(error);
    }
  }

  async findByEmail(email: string) {
    const User = await this.userRepo.findOne({ email });

    return User;
  }
  async findById(id: string) {
    const User = await this.userRepo.findById(id);
    if (!User) {
      throw new BadRequestException();
    }

    return User;
  }
}
