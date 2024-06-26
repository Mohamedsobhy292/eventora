import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { Event } from './event.entity';

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createAttendee(user, eventId) {
    // check if the user already attending this event
    const existingAttendee = await this.attendeeRepository.findOne({
      where: { userId: user.id, eventId: eventId },
    });

    if (existingAttendee) {
      throw new HttpException(
        'You already attending this event',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if the event in the future
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (event.date < new Date()) {
      throw new HttpException('Event already passed', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.attendeeRepository.save({
        eventId: eventId,
        userId: user.id,
      });
    } catch (error) {
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async eventAttendees(id) {
    return await this.dataSource.query(
      `SELECT * FROM attendee LEFT JOIN user_account ON user_account.id = attendee."userId" WHERE attendee."eventId" = ${id};`,
    );
  }
}
