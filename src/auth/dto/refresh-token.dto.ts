import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiPropertyOptional({
    description:
      'Refresh token. Можно не передавать, если используется HttpOnly cookie',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  refreshToken?: string;
}
