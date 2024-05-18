import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAttendeeDto, CreateEventDto } from './dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('')
  async create(@Body() event: CreateEventDto) {
    return this.eventsService.create(event);
  }

  @Get()
  async findAll() {
    return this.eventsService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/attend')
  async attend(@Param('id') id: string, @Body() attendee: CreateAttendeeDto) {
    return this.eventsService.attend(id, attendee);
  }

  @Get(':id/attendees')
  async eventAttendeesList(@Param('id') id: string) {
    return this.eventsService.eventAttendees(id);
  }
}
