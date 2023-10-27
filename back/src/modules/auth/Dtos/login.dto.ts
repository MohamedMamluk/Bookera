import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: 'John@test.com',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    required: true,
    example: '!Aa123456789',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
