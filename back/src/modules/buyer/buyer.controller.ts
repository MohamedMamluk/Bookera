import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './Dtos/create_buyer.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly userService: BuyerService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Duplicated User.' })
  @ApiBody({
    type: CreateBuyerDto,
    description: 'Json structure for user object',
  })
  @Post('')
  async createUser(@Body() userData: CreateBuyerDto) {
    return this.userService.createBuyer(userData);
  }
}
