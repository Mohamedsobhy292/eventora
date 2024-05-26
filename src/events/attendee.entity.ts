import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/user.entity';
import { Event } from './event.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Event, (E: Event) => E.id, {
    nullable: false,
    persistence: false,
  })
  @JoinColumn({ name: 'eventId' })
  eventId: number;

  @Column()
  @ManyToOne(() => User, (u: User) => u.id, {
    nullable: false,
    persistence: false,
  })
  @JoinColumn({ name: 'userId' })
  userId: number;
}
