import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Voucher, VoucherSchema } from './schema/voucher.schema';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
  ],
})
export class VoucherModule {}
