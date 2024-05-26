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
}
