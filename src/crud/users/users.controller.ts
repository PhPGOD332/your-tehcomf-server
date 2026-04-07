import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Roles } from '@/auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserEntity } from './entities/user.entity';
import { SafeUser, UsersService } from './users.service';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить список пользователей (только владелец)' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Roles(Role.OWNER)
  @Get('')
  async listUsers(): Promise<SafeUser[]> {
    return this.usersService.listUsers();
  }

  @ApiOperation({ summary: 'Создать пользователя (только владелец)' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Roles(Role.OWNER)
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<SafeUser> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Изменить роль пользователя (только владелец)' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Roles(Role.OWNER)
  @Patch(':id/role')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<SafeUser> {
    return this.usersService.updateUserRole(id, updateUserRoleDto.role);
  }

  @ApiOperation({
    summary: 'Активировать/деактивировать пользователя (только владелец)',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @Roles(Role.OWNER)
  @Patch(':id/status')
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<SafeUser> {
    return this.usersService.updateUserStatus(id, updateUserStatusDto.isActive);
  }

  @ApiOperation({
    summary: 'Сменить пароль пользователя (владелец или сам пользователь)',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @Patch(':id/password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @CurrentUser() currentUser: User,
  ): Promise<SafeUser> {
    if (currentUser.role !== Role.OWNER && currentUser.id !== id) {
      throw new ForbiddenException('Недостаточно прав для смены пароля');
    }

    return this.usersService.updateUserPassword(
      id,
      updateUserPasswordDto.password,
    );
  }
}
