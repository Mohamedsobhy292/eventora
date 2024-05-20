import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './auth-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private jwtService: JwtService,
  ) {}
  public async validateUser(username: string): Promise<any> {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  public async createProfile(profile: any, user: User): Promise<any> {
    try {
      const profileResult = await this.profileRepo.save({
        ...profile,
      });

      const userToUpdate = await this.userRepo.findOne({
        where: { id: user.id },
      });

      await this.userRepo.save({
        ...userToUpdate,
        profile: profileResult,
      });
      return profileResult;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async register(user: CreateUserDto): Promise<any> {
    try {
      return await this.userRepo.save({
        ...user,
        password: await this.hashPassword(user.password),
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getTokens(user: User): Promise<any> {
    return await this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10);
  }
}
