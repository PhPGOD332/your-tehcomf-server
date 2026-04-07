import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl = PrismaService.buildDatabaseUrl();
    super(
      databaseUrl
        ? {
            datasources: {
              db: {
                url: databaseUrl,
              },
            },
          }
        : undefined,
    );
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  private static buildDatabaseUrl(): string | undefined {
    if (process.env.DATABASE_URL) {
      return process.env.DATABASE_URL;
    }

    const host = process.env.PG_HOST ?? 'localhost';
    const port = process.env.PG_PORT ?? '5432';
    const database = process.env.PG_DB;
    const user = process.env.PG_USER;
    const password = process.env.PG_PASSWORD ?? '';

    if (!database || !user) {
      return undefined;
    }

    const encodedUser = encodeURIComponent(user);
    const encodedPassword = encodeURIComponent(password);

    return `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
  }
}
