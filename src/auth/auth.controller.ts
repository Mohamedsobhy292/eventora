import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserDto } from './auth-dto';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from './current-user-decorator';
import { Profile } from './profile.entity';

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

  @Post('create-profile')
  @UseGuards(AuthGuard('jwt'))
  async createProfile(@Body() profile: Profile, @currentUser() user: User) {
    return await this.authService.createProfile(profile, user);
  }
}
