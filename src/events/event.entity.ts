import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendee } from './attendee.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.organized)
  organizer: User;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
