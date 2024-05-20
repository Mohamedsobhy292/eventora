import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth-dto';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from './current-user-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@currentUser() user) {
    return {
      id: user.id,
      token: await this.authService.getTokens(user),
    };
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
