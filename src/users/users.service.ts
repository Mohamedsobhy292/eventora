import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  public async createProfile(
    profile: CreateProfileDto,
    user: User,
  ): Promise<any> {
    try {
      const hasProfile = await this.profileRepository.findOne({
        where: { userId: user.id },
      });

      // if user already has a profile, throw an error
      if (hasProfile) {
        throw new HttpException(
          'user already has profile',
          HttpStatus.BAD_REQUEST,
        );
      }

      const profileResult = await this.profileRepository.save({
        ...profile,
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

  public async getUserProfile(user: User): Promise<any> {
    return await this.dataSource.query(
      `SELECT * FROM user_account LEFT JOIN profile ON profile."userId" = user_account.id WHERE user_account.id = ${user.id};`,
    );
  }
}
