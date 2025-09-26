import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        dominantFoot: true,
        positions: true,
        level: true,
      },
    });
  }

  async updateMe(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        dominantFoot: dto.dominantFoot,
        positions: dto.positions,
        level: dto.level,
      },
      select: {
        id: true,
        phone: true,
        dominantFoot: true,
        positions: true,
        level: true,
      },
    });
  }
}
