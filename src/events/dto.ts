import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  address: string;
}

export class CreateAttendeeDto {
  @IsNotEmpty()
  name: string;
}
