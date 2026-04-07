import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class AuthUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ example: '15m' })
  accessTokenExpiresIn: string;

  @ApiProperty({ example: '30d' })
  refreshTokenExpiresIn: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
