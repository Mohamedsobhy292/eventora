import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from './profile.entity';
import { currentUser } from 'src/auth/current-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-profile')
  @UseGuards(AuthGuard('jwt'))
  async createProfile(
    @Body() profile: CreateProfileDto,
    @currentUser() user: User,
  ) {
    return await this.usersService.createProfile(profile, user);
  }
}
