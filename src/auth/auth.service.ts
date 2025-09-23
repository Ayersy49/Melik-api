import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { UsersService } from '../users/users.service';

function sixDigit() { return Math.floor(100000 + Math.random() * 900000).toString(); }

@Injectable()
export class AuthService {
  private redis: Redis;
  constructor(private cfg: ConfigService, private jwt: JwtService, private users: UsersService) {
    this.redis = new Redis(this.cfg.get<string>('REDIS_URL') || 'redis://localhost:6379');
  }
  async requestOtp(phone: string) {
    const code = sixDigit();
    await this.redis.set(`otp:${phone}`, code, 'EX', 300);
    const dev = this.cfg.get<string>('NODE_ENV') !== 'production';
    return { ok: true, devCode: dev ? code : undefined };
  }
  async verifyOtp(phone: string, code: string) {
    const key = `otp:${phone}`;
    const stored = await this.redis.get(key);
    if (!stored || stored !== code) return { ok: false, reason: 'INVALID_CODE' } as const;
    await this.redis.del(key);
    const user = await this.users.upsertByPhone(phone);
    const accessToken = await this.jwt.signAsync({ sub: user.id, phone: user.phone });
    return { ok: true, accessToken, user } as const;
  }
}
