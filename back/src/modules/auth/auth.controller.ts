import {
  Controller,
  Post,
  UseGuards,
  Req,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './Dtos/login.dto';

import { User } from '../user/schema/user.schema';
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
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user as HydratedDocument<User>;
    const expiresInFourHours = new Date(Date.now() + 60 * 60 * 4 * 1000);
    const { access_token, name } = await this.authService.login(user);
    response.cookie('access_token', access_token, {
      expires: expiresInFourHours,
    });
    return { name };
  }
}
