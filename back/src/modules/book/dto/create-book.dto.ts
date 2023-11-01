import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Category } from '../schema/book.schema';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cover: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

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
  @IsEnum(Category)
  category: Category;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
