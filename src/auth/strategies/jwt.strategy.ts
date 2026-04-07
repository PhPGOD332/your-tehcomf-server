import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/crud/users';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '@prisma/client';
import { getCookieValue } from '../utils/cookies.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret =
      configService.get<string>('JWT_ACCESS_SECRET') ??
      configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET/JWT_SECRET is not configured');
    }

    const accessCookieName =
      configService.get<string>('AUTH_ACCESS_COOKIE_NAME') ?? 'accessToken';

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request) => getCookieValue(request, accessCookieName),
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    if (payload.tokenType !== 'access') {
      throw new UnauthorizedException('Недопустимый тип токена');
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Пользователь не найден или заблокирован',
      );
    }

    return user;
  }
}
