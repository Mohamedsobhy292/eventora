import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  @ManyToOne(() => User, (u: User) => u.id, {
    nullable: false,
    persistence: false,
  })
  @JoinColumn({ name: 'userId' })
  userId: number;
}
