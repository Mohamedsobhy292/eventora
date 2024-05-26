import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { currentUser } from 'src/auth/current-user-decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('events/:eventId/attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createAttendee(@currentUser() user, @Param('eventId') eventId: number) {
    return this.attendeeService.createAttendee(user, eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async eventAttendeesList(@Param('eventId') id: string) {
    return this.attendeeService.eventAttendees(id);
  }
}
