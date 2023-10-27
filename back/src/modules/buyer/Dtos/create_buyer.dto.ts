import { IsNotEmpty, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IBuyer } from 'src/common/interfaces/buyer/IBuyer.interface';
import mongoose from 'mongoose';

export class CreateBuyerDto implements IBuyer {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  books_bought: string[];
}
