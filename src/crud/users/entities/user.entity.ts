import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
