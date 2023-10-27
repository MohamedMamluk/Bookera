import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Matches,
  Length,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/common/interfaces/user/IUser.interface';
import { Roles } from 'src/common/enums/roles.enum';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '!Aa123456789',
    required: true,
    description:
      'Must be a strong password that consists of letters, numbers, and symbols',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
  })
  @ApiProperty()
  @Matches(/^(010|011|012|015)\d{8}$/, {
    message: 'The number must start with 010 or 011 or 012 or 015',
  })
  @Length(11)
  @IsString({})
  @IsNotEmpty()
  phone_number: string;
}
