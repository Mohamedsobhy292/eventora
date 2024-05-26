import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateAttendeeDto, CreateEventDto } from './dto';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from 'src/auth/current-user-decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async create(@Body() event: CreateEventDto, @currentUser() user) {
    return this.eventsService.create(event, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.eventsService.find();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/attend')
  @UseGuards(AuthGuard('jwt'))
  async attend(@Param('id') id: string, @Body() attendee: CreateAttendeeDto) {
    return this.eventsService.attend(id, attendee);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/attendees')
  async eventAttendeesList(@Param('id') id: string) {
    return this.eventsService.eventAttendees(id);
  }
}
