import { Controller, Post, Body } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './Dtos/create_seller.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Duplicated Seller.' })
  @ApiBody({
    type: CreateSellerDto,
    description: 'Json structure for Seller object',
  })
  @Post('')
  async createSeller(@Body() SellerData: CreateSellerDto) {
    return this.sellerService.createSeller(SellerData);
  }
}
