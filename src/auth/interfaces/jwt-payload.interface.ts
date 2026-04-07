import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  tokenType: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}
