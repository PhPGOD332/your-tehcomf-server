import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({ example: 'NewStrongPassword_123' })
  @IsString()
  @MinLength(8)
  password: string;
}
