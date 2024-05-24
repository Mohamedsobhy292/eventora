import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  @ManyToOne(() => User, (u: User) => u.id, {
    nullable: false,
    persistence: false,
  })
  @JoinColumn({ name: 'organizerId' })
  organizerId: number;
}
