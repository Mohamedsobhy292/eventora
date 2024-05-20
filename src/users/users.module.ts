import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users-controller';
import { UsersService } from './users.service';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
