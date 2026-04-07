import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { BootstrapOwnerDto } from './dto/bootstrap-owner.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Public } from './decorators/public.decorator';
import { Request, Response } from 'express';

@ApiTags('Auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Логин администратора/пользователя',
    description:
      'Возвращает пару JWT токенов (access + refresh) и данные пользователя',
  })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const authResponse = await this.authService.login(loginDto);
    this.authService.setAuthCookies(response, authResponse);
    return authResponse;
  }

  @ApiOperation({
    summary: 'Создать первого владельца',
    description:
      'Можно вызвать только если в таблице users пока нет ни одного пользователя. Возвращает access и refresh токены',
  })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Public()
  @Post('bootstrap-owner')
  async bootstrapOwner(
    @Body() bootstrapOwnerDto: BootstrapOwnerDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const authResponse = await this.authService.bootstrapOwner(
      bootstrapOwnerDto.email,
      bootstrapOwnerDto.password,
    );
    this.authService.setAuthCookies(response, authResponse);
    return authResponse;
  }

  @ApiOperation({
    summary: 'Обновить access/refresh токены',
    description:
      'Берет refresh token из body или HttpOnly cookie, валидирует его и выдает новую пару токенов',
  })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const refreshToken = this.authService.extractRefreshToken(
      request,
      refreshTokenDto,
    );
    const authResponse = await this.authService.refresh(refreshToken);
    this.authService.setAuthCookies(response, authResponse);
    return authResponse;
  }

  @ApiOperation({
    summary: 'Выйти из системы',
    description: 'Удаляет refresh token в БД для текущего пользователя',
  })
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  @HttpCode(200)
  @Post('logout')
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ success: true }> {
    await this.authService.logout(user.id);
    this.authService.clearAuthCookies(response);
    return { success: true };
  }
}
