import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username);
    if (!user) {
      this.logger.debug('no user');
      throw new UnauthorizedException();
    }
    if ((await bcrypt.compare(password, user.password)) === false) {
      this.logger.debug('wrong password');
      throw new UnauthorizedException();
    }

    return user;
  }
}
