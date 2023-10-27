import { IsNotEmpty, IsArray, IsMongoId, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISeller } from 'src/common/interfaces/seller/ISeller.interface';
import mongoose from 'mongoose';

export class CreateSellerDto implements ISeller {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  vouchers: string[];
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: mongoose.Types.ObjectId;
  @ApiProperty()
  @Min(0)
  @IsNotEmpty()
  balance: number;
}
