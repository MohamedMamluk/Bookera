import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private bookService: BookService,
  ) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
