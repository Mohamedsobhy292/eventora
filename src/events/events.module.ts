import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { User } from 'src/auth/user.entity';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee-controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee, User])],
  controllers: [EventsController, AttendeeController],
  providers: [EventsService, AttendeeService],
})
export class EventsModule {}
