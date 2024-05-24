import { Controller, Post } from '@nestjs/common';
import { AttendeeService } from './attendee.service';

@Controller('events/:eventId/attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post()
  async createAttendee() {
    return this.attendeeService.createAttendee();
  }
}
