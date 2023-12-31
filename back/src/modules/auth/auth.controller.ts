import {
  Controller,
  Post,
  UseGuards,
  Req,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './Dtos/login.dto';

import { User } from '../user/schema/user.schema';
import { JwtGuard } from './guards/jwt.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    schema: { example: { access_token: 'some token' } },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized user' })
  @ApiBody({
    type: LoginDto,
    description: 'Json structure for Login object',
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req: Request) {
    const user = req.user as HydratedDocument<User>;
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('verifyToken')
  @ApiBearerAuth('access_token')
  async verifyAccessToken() {
    console.log('here');
  }
}
