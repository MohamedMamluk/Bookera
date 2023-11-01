import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private bookService: BookService) {}

  @UseGuards(JwtGuard)
  @Get('books')
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  @ApiBearerAuth('access_token')
  findAllBySellerId(@User() user) {
    return this.bookService.findAllBySellerId(user.userId);
  }
}
