import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/crud/database';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

export type SafeUser = Omit<
  User,
  'passwordHash' | 'refreshTokenHash' | 'refreshTokenExpiresAt'
>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(): Promise<SafeUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });

    return users.map((user) => this.toSafeUser(user));
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async usersCount(): Promise<number> {
    return this.prisma.user.count();
  }

  async createUser(createUserDto: CreateUserDto): Promise<SafeUser> {
    const exists = await this.findByEmail(createUserDto.email);

    if (exists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const passwordHash = await hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash,
        role: createUserDto.role ?? Role.USER,
        isActive: createUserDto.isActive ?? true,
      },
    });

    return this.toSafeUser(user);
  }

  async bootstrapOwner(email: string, password: string): Promise<SafeUser> {
    const usersCount = await this.usersCount();

    if (usersCount > 0) {
      throw new ConflictException('В системе уже есть пользователи');
    }

    const passwordHash = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role: Role.OWNER,
      },
    });

    return this.toSafeUser(user);
  }

  async updateUserRole(id: number, role: Role): Promise<SafeUser> {
    const user = await this.ensureUserExists(id);

    if (user.role === Role.OWNER && role !== Role.OWNER) {
      const ownersCount = await this.ownersCount();

      if (ownersCount <= 1) {
        throw new BadRequestException(
          'Нельзя снять роль владельца у последнего владельца в системе',
        );
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    return this.toSafeUser(updatedUser);
  }

  async updateUserStatus(id: number, isActive: boolean): Promise<SafeUser> {
    const user = await this.ensureUserExists(id);

    if (user.role === Role.OWNER && !isActive) {
      const activeOwnersCount = await this.prisma.user.count({
        where: {
          role: Role.OWNER,
          isActive: true,
        },
      });

      if (activeOwnersCount <= 1) {
        throw new BadRequestException(
          'Нельзя деактивировать последнего активного владельца',
        );
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isActive },
    });

    return this.toSafeUser(updatedUser);
  }

  async updateUserPassword(id: number, password: string): Promise<SafeUser> {
    await this.ensureUserExists(id);

    const passwordHash = await hash(password, 10);

    const user = await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });

    return this.toSafeUser(user);
  }

  async setRefreshToken(
    id: number,
    refreshToken: string,
    refreshTokenExpiresAt: Date,
  ): Promise<void> {
    const refreshTokenHash = await hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id },
      data: {
        refreshTokenHash,
        refreshTokenExpiresAt,
      },
    });
  }

  async clearRefreshToken(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        refreshTokenHash: null,
        refreshTokenExpiresAt: null,
      },
    });
  }

  async validateRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<boolean> {
    if (!user.refreshTokenHash || !user.refreshTokenExpiresAt) {
      return false;
    }

    if (user.refreshTokenExpiresAt.getTime() <= Date.now()) {
      return false;
    }

    return compare(refreshToken, user.refreshTokenHash);
  }

  toSafeUser(user: User): SafeUser {
    const {
      passwordHash,
      refreshTokenHash,
      refreshTokenExpiresAt,
      ...safeUser
    } = user;
    void passwordHash;
    void refreshTokenHash;
    void refreshTokenExpiresAt;
    return safeUser;
  }

  private ownersCount(): Promise<number> {
    return this.prisma.user.count({
      where: { role: Role.OWNER },
    });
  }

  private async ensureUserExists(id: number): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`Пользователь с id=${id} не найден`);
    }

    return user;
  }
}
