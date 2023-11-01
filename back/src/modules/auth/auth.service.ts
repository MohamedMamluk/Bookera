import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userExists = await this.userService.findByEmail(email);

    if (!userExists) {
      throw new BadRequestException('Please check your email or password');
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (userExists && isCorrectPassword) {
      return userExists;
    }
    return null;
  }

  async login(user: HydratedDocument<User>) {
    const payload = { username: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      name: payload.username,
      role: user.role,
    };
  }
}
