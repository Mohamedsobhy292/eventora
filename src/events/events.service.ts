import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto';
import { DataSource, Repository } from 'typeorm';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Attendee)
    private readonly attendeeRepo: Repository<Event>,
  ) {}

  public async create(event: CreateEventDto) {
    return this.eventRepo.save(event);
  }

  public async find() {
    return await this.eventRepo
      .createQueryBuilder('event')
      .orderBy('event.id', 'DESC')
      .getMany();
  }

  public async findOne(id) {
    return await this.eventRepo
      .createQueryBuilder('event')
      .orderBy('event.id', 'DESC')
      .andWhere('event.id = :id', { id })
      .getOne();
  }

  public async attend(id, attendee) {
    return await this.attendeeRepo.save({
      ...attendee,
      event: { id },
    });
  }

  public async eventAttendees(id) {
    return await this.dataSource.query(
      `SELECT * FROM attendee WHERE event_id = ${id}`,
    );
  }
}
