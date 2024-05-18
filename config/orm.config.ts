import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: '127.0.0.1',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'eventora',
  entities: [Event, Attendee],
  synchronize: true,
});
