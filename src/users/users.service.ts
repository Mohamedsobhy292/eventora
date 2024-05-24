import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async createProfile(
    profile: CreateProfileDto,
    user: User,
  ): Promise<any> {
    try {
      const hasProfile = await this.profileRepository.findOne({
        where: { userId: user.id },
      });

      console.log(hasProfile, 'hasProfile');

      // if user already has a profile, throw an error
      if (hasProfile) {
        throw new HttpException(
          'user already has profile',
          HttpStatus.BAD_REQUEST,
        );
      }

      const profileResult = await this.profileRepository.save({
        ...profile,
      });

      await this.userRepo.save({
        ...profileResult,
        userId: user.id,
      });

      return profileResult;
    } catch (e) {
      throw new HttpException(
        'user already has profile',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
