import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'owner@tehcomf.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword_123' })
  @IsString()
  @MinLength(8)
  password: string;
}
