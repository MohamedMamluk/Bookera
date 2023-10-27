import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AttachSellerIdInterceptor } from 'src/common/interceptors/attach_seller_id.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { CanMutate } from './guards/mutate_voucher.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Voucher')
@ApiBearerAuth('access_token')
@UseGuards(JwtGuard)
@Controller('voucher')
export class VoucherController {
  constructor(private voucherService: VoucherService) {
    this.voucherService = voucherService;
  }

  @Post()
  @ApiBody({ type: CreateVoucherDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseInterceptors(AttachSellerIdInterceptor)
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateVoucherDto,
    isArray: true,
  })
  findAll(@User() user) {
    return this.voucherService.findAll(user);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CreateVoucherDto })
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @UseGuards(CanMutate)
  @Patch(':id')
  @ApiBody({ type: CreateVoucherDto })
  @ApiResponse({ status: HttpStatus.OK, type: CreateVoucherDto })
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(id, updateVoucherDto);
  }

  @UseGuards(CanMutate)
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CreateVoucherDto })
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id);
  }
}
