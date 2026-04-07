import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { CookieOptions, Request, Response } from 'express';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@/crud/users';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { getCookieValue } from './utils/cookies.util';

type AuthUser = Pick<User, 'id' | 'email' | 'role'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return this.issueTokens(user);
  }

  async bootstrapOwner(
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.usersService.bootstrapOwner(email, password);
    return this.issueTokens(user);
  }

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    const payload = this.verifyRefreshToken(refreshToken);
    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Пользователь не найден или заблокирован',
      );
    }

    const isRefreshTokenValid = await this.usersService.validateRefreshToken(
      user,
      refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token недействителен');
    }

    return this.issueTokens(user);
  }

  async logout(userId: number): Promise<void> {
    await this.usersService.clearRefreshToken(userId);
  }

  extractRefreshToken(
    request: Request,
    refreshTokenDto?: RefreshTokenDto,
  ): string {
    const fromBody = refreshTokenDto?.refreshToken?.trim();

    if (fromBody) {
      return fromBody;
    }

    const fromCookie = getCookieValue(request, this.getRefreshCookieName());

    if (fromCookie) {
      return fromCookie;
    }

    throw new UnauthorizedException('Refresh token отсутствует');
  }

  setAuthCookies(response: Response, authResponse: AuthResponseDto): void {
    const baseCookieOptions = this.getBaseCookieOptions();

    response.cookie(this.getAccessCookieName(), authResponse.accessToken, {
      ...baseCookieOptions,
      path: this.getAccessCookiePath(),
      maxAge:
        this.parseJwtExpirationToSeconds(authResponse.accessTokenExpiresIn) *
        1000,
    });

    response.cookie(this.getRefreshCookieName(), authResponse.refreshToken, {
      ...baseCookieOptions,
      path: this.getRefreshCookiePath(),
      maxAge:
        this.parseJwtExpirationToSeconds(authResponse.refreshTokenExpiresIn) *
        1000,
    });
  }

  clearAuthCookies(response: Response): void {
    const baseCookieOptions = this.getBaseCookieOptions();

    response.clearCookie(this.getAccessCookieName(), {
      ...baseCookieOptions,
      path: this.getAccessCookiePath(),
    });

    response.clearCookie(this.getRefreshCookieName(), {
      ...baseCookieOptions,
      path: this.getRefreshCookiePath(),
    });
  }

  private async issueTokens(user: AuthUser): Promise<AuthResponseDto> {
    const accessTokenPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenType: 'access',
    };

    const refreshTokenPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenType: 'refresh',
    };

    const accessTokenExpiresIn = this.getAccessTokenExpiresIn();
    const refreshTokenExpiresIn = this.getRefreshTokenExpiresIn();
    const accessTokenExpiresInSeconds =
      this.parseJwtExpirationToSeconds(accessTokenExpiresIn);
    const refreshTokenExpiresInSeconds = this.parseJwtExpirationToSeconds(
      refreshTokenExpiresIn,
    );

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      secret: this.getAccessTokenSecret(),
      expiresIn: accessTokenExpiresInSeconds,
    });

    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: this.getRefreshTokenSecret(),
      expiresIn: refreshTokenExpiresInSeconds,
    });

    const verifiedRefreshToken = this.verifyRefreshToken(refreshToken);

    if (!verifiedRefreshToken.exp) {
      throw new UnauthorizedException(
        'Не удалось определить срок refresh token',
      );
    }

    const refreshTokenExpiresAt = new Date(verifiedRefreshToken.exp * 1000);

    await this.usersService.setRefreshToken(
      user.id,
      refreshToken,
      refreshTokenExpiresAt,
    );

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  private verifyRefreshToken(token: string): JwtPayload {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.getRefreshTokenSecret(),
      });

      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Некорректный тип токена');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Refresh token недействителен или истек');
    }
  }

  private getAccessTokenSecret(): string {
    const secret =
      this.configService.get<string>('JWT_ACCESS_SECRET') ??
      this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET/JWT_SECRET is not configured');
    }

    return secret;
  }

  private getRefreshTokenSecret(): string {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not configured');
    }

    return secret;
  }

  private getAccessTokenExpiresIn(): string {
    return this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m';
  }

  private getRefreshTokenExpiresIn(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '30d';
  }

  private getAccessCookieName(): string {
    return (
      this.configService.get<string>('AUTH_ACCESS_COOKIE_NAME') ?? 'accessToken'
    );
  }

  private getRefreshCookieName(): string {
    return (
      this.configService.get<string>('AUTH_REFRESH_COOKIE_NAME') ??
      'refreshToken'
    );
  }

  private getAccessCookiePath(): string {
    return this.configService.get<string>('AUTH_ACCESS_COOKIE_PATH') ?? '/';
  }

  private getRefreshCookiePath(): string {
    return (
      this.configService.get<string>('AUTH_REFRESH_COOKIE_PATH') ??
      '/api/auth/refresh'
    );
  }

  private getBaseCookieOptions(): CookieOptions {
    const sameSite = this.getSameSiteValue();
    const domain = this.configService.get<string>('AUTH_COOKIE_DOMAIN');
    const secure = this.getBooleanConfig(
      'AUTH_COOKIE_SECURE',
      process.env.NODE_ENV === 'production',
    );
    const httpOnly = this.getBooleanConfig('AUTH_COOKIE_HTTP_ONLY', true);

    return {
      httpOnly,
      secure,
      sameSite,
      ...(domain ? { domain } : {}),
    };
  }

  private getSameSiteValue(): CookieOptions['sameSite'] {
    const value =
      this.configService.get<string>('AUTH_COOKIE_SAME_SITE')?.toLowerCase() ??
      'lax';

    if (value === 'strict' || value === 'lax' || value === 'none') {
      return value;
    }

    return 'lax';
  }

  private getBooleanConfig(key: string, defaultValue: boolean): boolean {
    const value = this.configService.get<string>(key);

    if (value === undefined) {
      return defaultValue;
    }

    return value.toLowerCase() === 'true';
  }

  private parseJwtExpirationToSeconds(value: string): number {
    const normalized = value.trim().toLowerCase();
    const match = normalized.match(/^(\d+)(s|m|h|d)?$/);

    if (!match) {
      throw new Error(
        `Invalid JWT expires format: "${value}". Expected formats: 900, 15m, 7d`,
      );
    }

    const amount = Number(match[1]);
    const unit = match[2] ?? 's';

    switch (unit) {
      case 's':
        return amount;
      case 'm':
        return amount * 60;
      case 'h':
        return amount * 60 * 60;
      case 'd':
        return amount * 60 * 60 * 24;
      default:
        throw new Error(`Unsupported JWT expires unit: "${unit}"`);
    }
  }
}
