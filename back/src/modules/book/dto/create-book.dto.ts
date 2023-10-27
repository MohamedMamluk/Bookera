import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  sellerId: mongoose.Schema.Types.ObjectId;
}
