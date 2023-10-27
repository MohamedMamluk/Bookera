import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schema/user.schema';
import { CreateUserDto } from './Dtos/create_user.dto';
import { DuplicateUserException } from 'src/exxceptions/duplicated.exception';
import { SellerService } from '../seller/seller.service';
import { BuyerService } from '../buyer/buyer.service';
import { Roles } from 'src/common/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    private sellerRepo: SellerService,
    private buyerRepo: BuyerService,
  ) {}

  async createUser(UserData: CreateUserDto) {
    try {
      const createdUser = await this.userRepo.create(UserData);
      if (!createdUser) {
        throw new DuplicateUserException(UserData.email);
      }
      let userRole;
      if (createdUser.role === Roles.BUYER) {
        userRole = await this.buyerRepo.createBuyer({
          books_bought: [],
          userId: createdUser._id,
        });
      } else {
        userRole = await this.sellerRepo.createSeller({
          balance: 0,
          vouchers: [],
          userId: createdUser._id,
        });
      }
      return {
        message: 'User Created',
        data: {
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          ...userRole,
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
