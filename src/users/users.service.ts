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
      const userToUpdate = await this.userRepo.findOne({
        where: { id: user.id },
        relations: {
          profile: true,
        },
      });

      if (userToUpdate?.profile?.id) {
        throw new HttpException(
          'user already has profile',
          HttpStatus.BAD_REQUEST,
        );
      }

      const profileResult = await this.profileRepository.save({
        ...profile,
      });

      await this.userRepo.save({
        ...userToUpdate,
        profile: profileResult,
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
