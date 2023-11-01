import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CanMutate } from './guards/can_mutate.guard';
import { Request } from 'express';
@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateBookDto,
    isArray: true,
  })
  @ApiQuery({ name: 'title', type: String, required: false })
  findAll(@Query() query: Record<string, string>) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBearerAuth('access_token')
  create(@Body() createBookDto: CreateBookDto, @Req() request: Request) {
    const user = request.user as { userId: string };
    return this.bookService.create({
      ...createBookDto,
      sellerId: user.userId,
    });
  }

  @UseGuards(JwtGuard, CanMutate)
  @Patch(':id')
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBearerAuth('access_token')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtGuard, CanMutate)
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBearerAuth('access_token')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
