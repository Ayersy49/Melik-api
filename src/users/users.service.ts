import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async upsertByPhone(phone: string) {
    return this.prisma.user.upsert({ where: { phone }, update: {}, create: { phone } });
  }
}

