import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BooksSoldService } from './books_sold.service';
import { User } from 'src/common/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('books-sold')
@UseGuards(JwtGuard)
@ApiTags('Books Sold')
@ApiBearerAuth('access_token')
export class BooksSoldController {
  constructor(private readonly booksSoldService: BooksSoldService) {}

  @Get('stats')
  async sellerStatistics(@User() user) {
    console.log(user.userId);
    return await this.booksSoldService.sellingStatistics(user.userId);
  }
  @Get('')
  async sellerSales(@Query() query: Record<string, string>, @User() user) {
    console.log(user.userId);
    return await this.booksSoldService.findBySellerIdAndPopulate(
      user.userId,
      query,
    );
  }
}
