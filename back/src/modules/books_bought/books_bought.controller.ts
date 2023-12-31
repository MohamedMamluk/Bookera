import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BooksBoughtService } from './books_bought.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import mongoose from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('books-bought')
@UseGuards(JwtGuard)
@ApiTags('Books Sold')
@ApiBearerAuth('access_token')
export class BooksBoughtController {
  constructor(private readonly booksBoughtService: BooksBoughtService) {}

  @Get()
  async booksBoughtByUser(@User() user) {
    return this.booksBoughtService.findByBuyerIdAndPopulate(user.userId);
  }
  @Get(':id')
  async bookBoughtByUser(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @User() user,
  ) {
    return this.booksBoughtService.findByBuyerIdAndBookId({
      buyerId: user.userId,
      book: id,
    });
  }
}
