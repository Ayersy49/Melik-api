import { Controller, Get, Put, Body, Req /*, UseGuards*/ } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
// @UseGuards(JwtAuthGuard) // guard hazır değilse şimdilik kapalı
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me')
  getMe(@Req() req: any) {
    const userId = req.user?.sub ?? req.user?.id ?? '__DEV__'; // geçici
    return this.users.getMe(userId);
  }

  @Put('me')
  updateMe(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const userId = req.user?.sub ?? req.user?.id ?? '__DEV__'; // geçici
    return this.users.updateMe(userId, dto);
  }
}
