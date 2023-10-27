import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/create_user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Duplicated User.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for User object',
  })
  @Post('')
  async createUser(@Body() UserData: CreateUserDto) {
    return this.userService.createUser(UserData);
  }
}
