import { IsDateString, IsNotEmpty, Length } from 'class-validator';

export class CreateEventDto {
  @Length(5, 255)
  name: string;

  @Length(5, 255)
  description: string;

  @IsDateString()
  date: Date;

  @Length(5, 255)
  address: string;
}

export class CreateAttendeeDto {
  @IsNotEmpty()
  name: string;
}
