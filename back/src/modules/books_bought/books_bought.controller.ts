import { Controller, Get, UseGuards } from '@nestjs/common';
import { BooksBoughtService } from './books_bought.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('books-bought')
@UseGuards(JwtGuard)
export class BooksBoughtController {
  constructor(private readonly booksBoughtService: BooksBoughtService) {}

  @Get()
  async booksBoughtByUser(@User() user) {
    return this.booksBoughtService.findByBuyerIdAndPopulate(user.userId);
  }
}
