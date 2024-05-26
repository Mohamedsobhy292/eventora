import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto';
import { DataSource, Repository } from 'typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Attendee)
    private readonly attendeeRepo: Repository<Attendee>,
  ) {}

  public async create(event: CreateEventDto, user: User): Promise<Event> {
    try {
      return await this.eventRepo.save({
        ...event,
        date: event.date,
        organizerId: user.id,
      });
    } catch (e) {
      console.error(e);
      throw new ForbiddenException();
    }
  }

  public async find() {
    return await this.dataSource.query(`SELECT * FROM event ORDER BY id DESC`);
  }

  public async findOne(id) {
    return await this.dataSource.query(`SELECT * FROM event WHERE id = ${id}`);
  }

  public async attend(id, attendee) {
    try {
      return await this.attendeeRepo.save({
        ...attendee,
        event: { id },
      });
    } catch (e) {
      console.error(e);
      throw new ForbiddenException();
    }
  }

  public async eventAttendees(id) {
    return await this.dataSource.query(
      `SELECT * FROM attendee WHERE event_id = ${id}`,
    );
  }
}
