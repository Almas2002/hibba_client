import { User } from '../../user/user.entity';
import {
  CreateDateColumn, Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JoinedRoom } from './joined-room.entity';
import { Message } from './message.entity';


@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

  @OneToMany(() => Message, message => message.room)
  messages: Message[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => JoinedRoom, room => room.room)
  joinedUsers: JoinedRoom[];
}