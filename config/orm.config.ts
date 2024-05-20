import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/users/profile.entity';
import { User } from 'src/auth/user.entity';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: '127.0.0.1',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'eventora',
  entities: [Event, Attendee, User, Profile],
  synchronize: true,
});
